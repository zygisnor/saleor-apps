/* eslint-disable no-console */
/*
 * One-shot: pull every SMTP config out of Saleor app metadata, replace each
 * event's `template` and `subject` with the current defaults from
 * default-templates.ts, save back. Use after pushing template/copy/branding
 * changes to make them visible in already-installed app instances.
 *
 * Run from /srv/apps/apps/smtp inside the running container:
 *   pnpm tsx scripts/reset-templates.ts
 */
import { type AuthData } from "@saleor/app-sdk/APL";

import { createInstrumentedGraphqlClient } from "../src/lib/create-instrumented-graphql-client";
import { createSettingsManager } from "../src/lib/metadata-manager";
import { SmtpMetadataManager } from "../src/modules/smtp/configuration/smtp-metadata-manager";
import {
  defaultMjmlSubjectTemplates,
  defaultMjmlTemplates,
} from "../src/modules/smtp/default-templates";
import { saleorApp } from "../src/saleor-app";

const dryRun = process.argv.includes("--dry-run");

async function processAuthData(authData: AuthData): Promise<void> {
  console.log(`\n=== ${authData.saleorApiUrl} (app ${authData.appId}) ===`);

  const client = createInstrumentedGraphqlClient({
    saleorApiUrl: authData.saleorApiUrl,
    token: authData.token,
  });

  const metadataManager = new SmtpMetadataManager(
    createSettingsManager(client, authData.appId),
    authData.saleorApiUrl,
  );

  const result = await metadataManager.getConfig();

  if (result.isErr()) {
    console.error("getConfig failed:", result.error.message);

    return;
  }

  const config = result.value;

  if (!config) {
    console.log("no config found, skipping");

    return;
  }

  let touched = 0;

  for (const cfg of config.configurations) {
    for (const event of cfg.events) {
      const newTemplate = defaultMjmlTemplates[event.eventType];
      const newSubject = defaultMjmlSubjectTemplates[event.eventType];

      if (event.template !== newTemplate || event.subject !== newSubject) {
        event.template = newTemplate;
        event.subject = newSubject;
        touched += 1;
      }
    }
    console.log(`config "${cfg.name}": ${cfg.events.length} events, updated ${touched}`);
  }

  if (touched === 0) {
    console.log("nothing to do");

    return;
  }

  if (dryRun) {
    console.log(`[dry-run] would persist ${touched} updated event(s)`);

    return;
  }

  const saveResult = await metadataManager.setConfig(config);

  if (saveResult.isErr()) {
    console.error("setConfig failed:", saveResult.error.message);

    return;
  }

  console.log(`saved (${touched} event(s) reset to defaults)`);
}

async function main(): Promise<void> {
  // Upstash APL doesn't support getAll(), so the Saleor instance URL must
  // be passed explicitly. Default to wwspares prod.
  const saleorApiUrl = process.argv.find((a) => a.startsWith("https://")) ?? "https://api.wwspares.com/graphql/";

  console.log(`Resolving APL entry for ${saleorApiUrl}${dryRun ? " (dry-run)" : ""}`);

  const auth = await saleorApp.apl.get(saleorApiUrl);

  if (!auth) {
    console.error("no APL entry for", saleorApiUrl);
    process.exit(1);
  }

  await processAuthData(auth);
}

main().catch((e) => {
  console.error("fatal:", e);
  process.exit(1);
});
