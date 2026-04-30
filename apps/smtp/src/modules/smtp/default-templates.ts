import { type MessageEventTypes } from "../event-handlers/message-event-types";

/*
 * Design system — industrial automotive palette: deep blue + amber accent.
 * Slate neutrals carried over for body text and dividers.
 */
const colors = {
  primary: "#0b3a6f", // Deep trade blue — headings, primary buttons
  accent: "#ea580c", // Amber — accent strip + secondary highlights
  text: "#1f2937", // Slate 800 — body text
  muted: "#64748b", // Slate 500 — secondary text
  border: "#e2e8f0", // Slate 200 — dividers
  background: "#f5f7fa", // Cool grey — page background
  surface: "#ffffff", // White — card background
  panel: "#f1f5f9", // Slate 100 — info chips, gift card panel
  danger: "#b91c1c", // Red 700 — destructive button (account delete only)
};

const SUPPORT_EMAIL = "info@wwspares.com";

// ---- Shared MJML head ----
const mjHead = `<mj-head>
  <mj-attributes>
    <mj-all font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif" />
    <mj-body background-color="${colors.background}" />
    <mj-wrapper padding="0" background-color="${colors.surface}" border-radius="10px" />
    <mj-section padding="0" />
    <mj-column padding="0" />
    <mj-text padding="0" font-size="16px" line-height="1.6" color="${colors.text}" />
    <mj-button background-color="${colors.primary}" color="white" border-radius="6px" font-size="16px" font-weight="600" inner-padding="14px 28px" />
  </mj-attributes>
  <mj-breakpoint width="480px" />
  <mj-style>
    .product-row td { padding: 16px 0; border-bottom: 1px solid ${colors.border}; vertical-align: top; }
    .product-row:last-child td { border-bottom: none; }
    .totals-row td { padding: 8px 0; }
    .totals-row.total td { padding-top: 12px; border-top: 1px solid ${colors.border}; font-weight: 600; }
    .sku-chip { display: inline-block; font-family: 'SFMono-Regular', Menlo, Consolas, monospace; font-size: 12px; color: ${colors.muted}; background: ${colors.panel}; padding: 2px 8px; border-radius: 4px; margin-top: 4px; }
    .accent-bar { height: 4px; background: ${colors.accent}; border-radius: 10px 10px 0 0; }
    @media only screen and (max-width: 480px) {
      .billing-column { padding-top: 24px !important; }
    }
  </mj-style>
</mj-head>`;

// ---- Top accent bar (brand signature) ----
const accentBar = `<mj-section padding="0" background-color="${colors.surface}">
  <mj-column>
    <mj-raw><div class="accent-bar" style="height:4px;background:${colors.accent};border-radius:10px 10px 0 0;line-height:4px;font-size:0;">&nbsp;</div></mj-raw>
  </mj-column>
</mj-section>`;

// ---- Header for Notify-payload templates (snake_case: site_name / logo_url) ----
const headerSection = `<mj-section padding="24px 24px 16px">
  <mj-column>
    {{#if logo_url}}
    <mj-image src="{{logo_url}}" alt="{{site_name}}" width="120px" align="left" padding="0" />
    {{else}}
    <mj-text font-size="22px" font-weight="700" color="${colors.primary}" padding="0">
      {{#if site_name}}{{site_name}}{{else}}WWSpares{{/if}}
    </mj-text>
    {{/if}}
  </mj-column>
</mj-section>`;

// ---- Header for Order-webhook templates (uses branding from app config) ----
const orderHeaderSection = `<mj-section padding="24px 24px 16px">
  <mj-column>
    {{#if branding.logoUrl}}
    <mj-image src="{{branding.logoUrl}}" alt="{{branding.siteName}}" width="120px" align="left" padding="0" />
    {{else}}
    <mj-text font-size="22px" font-weight="700" color="${colors.primary}" padding="0">
      {{#if branding.siteName}}{{branding.siteName}}{{else}}{{#if order.channel.name}}{{order.channel.name}}{{else}}WWSpares{{/if}}{{/if}}
    </mj-text>
    {{/if}}
  </mj-column>
</mj-section>`;

// ---- Trust strip (only for transactional order emails) ----
const trustStrip = `<mj-section padding="0 24px 16px">
  <mj-column>
    <mj-text font-size="12px" font-weight="600" color="${colors.muted}" letter-spacing="1px" align="left" padding="0">
      12-MONTH WARRANTY &nbsp;·&nbsp; EU-WIDE SHIPPING &nbsp;·&nbsp; GENUINE OEM
    </mj-text>
  </mj-column>
</mj-section>`;

// ---- Footer for Order-webhook templates ----
const orderFooterSection = `<mj-section padding="24px 24px 0">
  <mj-column>
    <mj-divider border-color="${colors.border}" border-width="1px" padding="0 0 20px" />
    <mj-text font-size="14px" color="${colors.text}" align="center" padding="0 0 8px">
      <strong>Need help with this order?</strong>
    </mj-text>
    <mj-text font-size="14px" color="${colors.muted}" align="center" padding="0 0 4px">
      Reply to this email or write to <a href="mailto:${SUPPORT_EMAIL}" style="color:${colors.primary};text-decoration:none;"><strong>${SUPPORT_EMAIL}</strong></a>.
    </mj-text>
    <mj-text font-size="13px" color="${colors.muted}" align="center" padding="0 0 16px">
      Quote your order number when contacting us — we'll get back to you within one business day.
    </mj-text>
  </mj-column>
</mj-section>
<mj-section padding="0 24px 24px">
  <mj-column>
    <mj-text font-size="12px" color="${colors.muted}" align="center" padding="0">
      WWSpares &mdash; used genuine OEM auto parts &mdash; VW, Audi, BMW, Mercedes, Porsche &amp; more
    </mj-text>
    {{#if branding.siteName}}
    <mj-text font-size="12px" color="${colors.muted}" align="center" padding-top="4px">
      &copy; {{branding.siteName}}
    </mj-text>
    {{else}}
    {{#if order.channel.name}}
    <mj-text font-size="12px" color="${colors.muted}" align="center" padding-top="4px">
      &copy; {{order.channel.name}}
    </mj-text>
    {{/if}}
    {{/if}}
  </mj-column>
</mj-section>`;

// ---- Footer for Notify-payload templates (account / fulfillment-update) ----
const footerSection = `<mj-section padding="24px 24px 0">
  <mj-column>
    <mj-divider border-color="${colors.border}" border-width="1px" padding="0 0 20px" />
    <mj-text font-size="14px" color="${colors.text}" align="center" padding="0 0 8px">
      <strong>Questions?</strong>
    </mj-text>
    <mj-text font-size="14px" color="${colors.muted}" align="center" padding="0 0 16px">
      Write to <a href="mailto:${SUPPORT_EMAIL}" style="color:${colors.primary};text-decoration:none;"><strong>${SUPPORT_EMAIL}</strong></a> &mdash; we'll respond within one business day.
    </mj-text>
  </mj-column>
</mj-section>
<mj-section padding="0 24px 24px">
  <mj-column>
    <mj-text font-size="12px" color="${colors.muted}" align="center" padding="0">
      WWSpares &mdash; used genuine OEM auto parts
    </mj-text>
    {{#if site_name}}
    <mj-text font-size="12px" color="${colors.muted}" align="center" padding-top="4px">
      &copy; {{site_name}}
    </mj-text>
    {{/if}}
  </mj-column>
</mj-section>`;

// ---- Order lines with thumbnail + SKU chip ----
const orderLinesWithImages = `<mj-section padding="0 24px">
  <mj-column>
    <mj-text font-size="12px" font-weight="600" color="${colors.muted}" letter-spacing="1px" padding="0 0 12px">ITEMS IN THIS ORDER</mj-text>
    <mj-table padding="0" cellpadding="0" cellspacing="0">
      {{#each order.lines}}
      <tr class="product-row">
        <td style="width: 64px; padding-right: 16px; vertical-align: top;">
          {{#if this.thumbnail.url}}
          <img src="{{this.thumbnail.url}}" alt="{{this.productName}}" width="64" height="64" style="border-radius: 6px; object-fit: cover;" />
          {{else}}
          <div style="width: 64px; height: 64px; background: ${colors.panel}; border-radius: 6px;"></div>
          {{/if}}
        </td>
        <td style="vertical-align: top; max-width: 280px;">
          <div style="font-weight: 600; color: ${colors.primary}; margin-bottom: 4px;">{{this.productName}}</div>
          {{#if this.variantName}}<div style="font-size: 14px; color: ${colors.muted};">{{this.variantName}}</div>{{/if}}
          <div style="font-size: 14px; color: ${colors.muted};">Qty: {{this.quantity}}</div>
          {{#if this.productSku}}<div class="sku-chip">SKU: {{this.productSku}}</div>{{/if}}
        </td>
        <td style="width: 24px;"></td>
        <td style="text-align: right; vertical-align: top; white-space: nowrap;">
          <div style="font-weight: 600; color: ${colors.primary};">{{this.totalPrice.gross.amount}} {{this.totalPrice.gross.currency}}</div>
        </td>
      </tr>
      {{/each}}
    </mj-table>
  </mj-column>
</mj-section>`;

// ---- Order totals ----
const orderTotals = `<mj-section padding="16px 24px 0">
  <mj-column>
    <mj-table padding="0" cellpadding="0" cellspacing="0" font-size="14px" color="${colors.text}">
      <tr class="totals-row">
        <td>Subtotal</td>
        <td style="text-align: right;">{{order.subtotal.gross.amount}} {{order.subtotal.gross.currency}}</td>
      </tr>
      <tr class="totals-row">
        <td>Shipping</td>
        <td style="text-align: right;">{{order.shippingPrice.gross.amount}} {{order.shippingPrice.gross.currency}}</td>
      </tr>
      {{#if order.total.tax.amount}}
      <tr class="totals-row">
        <td>Tax</td>
        <td style="text-align: right;">{{order.total.tax.amount}} {{order.total.tax.currency}}</td>
      </tr>
      {{/if}}
      <tr class="totals-row total">
        <td style="color: ${colors.primary};">Total</td>
        <td style="text-align: right; color: ${colors.primary};">{{order.total.gross.amount}} {{order.total.gross.currency}}</td>
      </tr>
    </mj-table>
  </mj-column>
</mj-section>`;

// ---- Address blocks side by side (used on order-created/confirmed/fully-paid) ----
const addressBlocksBothColumns = `<mj-section padding="24px 24px 0">
  <mj-column>
    <mj-text font-size="12px" font-weight="600" color="${colors.muted}" letter-spacing="1px" padding="0 0 8px">SHIPPING TO</mj-text>
    {{#if order.shippingAddress}}
    <mj-text padding="0" color="${colors.text}">
      {{order.shippingAddress.firstName}} {{order.shippingAddress.lastName}}<br />
      {{#if order.shippingAddress.companyName}}{{order.shippingAddress.companyName}}<br />{{/if}}
      {{order.shippingAddress.streetAddress1}}{{#if order.shippingAddress.streetAddress2}}<br />{{order.shippingAddress.streetAddress2}}{{/if}}<br />
      {{order.shippingAddress.city}}, {{order.shippingAddress.countryArea}} {{order.shippingAddress.postalCode}}<br />
      {{order.shippingAddress.country.country}}
    </mj-text>
    {{else}}
    <mj-text padding="0" color="${colors.muted}">No shipping required</mj-text>
    {{/if}}
  </mj-column>
  <mj-column css-class="billing-column">
    <mj-text font-size="12px" font-weight="600" color="${colors.muted}" letter-spacing="1px" padding="0 0 8px">BILLING TO</mj-text>
    {{#if order.billingAddress}}
    <mj-text padding="0" color="${colors.text}">
      {{order.billingAddress.firstName}} {{order.billingAddress.lastName}}<br />
      {{#if order.billingAddress.companyName}}{{order.billingAddress.companyName}}<br />{{/if}}
      {{order.billingAddress.streetAddress1}}{{#if order.billingAddress.streetAddress2}}<br />{{order.billingAddress.streetAddress2}}{{/if}}<br />
      {{order.billingAddress.city}}, {{order.billingAddress.countryArea}} {{order.billingAddress.postalCode}}<br />
      {{order.billingAddress.country.country}}
    </mj-text>
    {{else}}
    <mj-text padding="0" color="${colors.muted}">No billing address</mj-text>
    {{/if}}
  </mj-column>
</mj-section>`;

// ---- Shipping address only (camelCase, for ORDER_FULFILLED) ----
const shippingAddressBlock = `<mj-section padding="24px 24px 0">
  <mj-column>
    <mj-text font-size="12px" font-weight="600" color="${colors.muted}" letter-spacing="1px" padding="0 0 8px">SHIPPING TO</mj-text>
    {{#if order.shippingAddress}}
    <mj-text padding="0" color="${colors.text}">
      {{order.shippingAddress.firstName}} {{order.shippingAddress.lastName}}<br />
      {{#if order.shippingAddress.companyName}}{{order.shippingAddress.companyName}}<br />{{/if}}
      {{order.shippingAddress.streetAddress1}}{{#if order.shippingAddress.streetAddress2}}<br />{{order.shippingAddress.streetAddress2}}{{/if}}<br />
      {{order.shippingAddress.city}}, {{order.shippingAddress.countryArea}} {{order.shippingAddress.postalCode}}<br />
      {{order.shippingAddress.country.country}}
    </mj-text>
    {{else}}
    <mj-text padding="0" color="${colors.muted}">No shipping required</mj-text>
    {{/if}}
  </mj-column>
</mj-section>`;

// ---- Shipping address (snake_case Notify payload, for ORDER_FULFILLMENT_UPDATE) ----
const shippingAddressBlockNotify = `<mj-section padding="24px 24px 0">
  <mj-column>
    <mj-text font-size="12px" font-weight="600" color="${colors.muted}" letter-spacing="1px" padding="0 0 8px">SHIPPING TO</mj-text>
    {{#if order.shipping_address}}
    <mj-text padding="0" color="${colors.text}">
      {{order.shipping_address.first_name}} {{order.shipping_address.last_name}}<br />
      {{order.shipping_address.street_address_1}}{{#if order.shipping_address.street_address_2}}, {{order.shipping_address.street_address_2}}{{/if}}<br />
      {{order.shipping_address.city}}, {{order.shipping_address.country_area}} {{order.shipping_address.postal_code}}<br />
      {{order.shipping_address.country}}
    </mj-text>
    {{else}}
    <mj-text padding="0" color="${colors.muted}">No shipping required</mj-text>
    {{/if}}
  </mj-column>
</mj-section>`;

// ---- Order number badge ----
const orderNumberBadge = `<mj-section padding="20px 24px 0">
  <mj-column>
    <mj-text font-size="12px" font-weight="600" color="${colors.muted}" letter-spacing="1px" padding="0">ORDER #{{order.number}}</mj-text>
  </mj-column>
</mj-section>`;

const sectionDivider = `<mj-section padding="16px 24px"><mj-column><mj-divider border-color="${colors.border}" border-width="1px" padding="0" /></mj-column></mj-section>`;

/*
 * ============================================================
 * ORDER TEMPLATES
 * ============================================================
 */

const defaultOrderCreatedMjmlTemplate = `<mjml>
${mjHead}
<mj-body>
  <mj-wrapper>
    ${accentBar}
    ${orderHeaderSection}
    <mj-section padding="0 24px 8px">
      <mj-column>
        <mj-text font-size="24px" font-weight="700" color="${colors.primary}" padding="0 0 12px">Order received</mj-text>
        <mj-text padding="0 0 8px">Thanks for ordering with WWSpares. We've logged your order and our team is checking stock now.</mj-text>
        <mj-text padding="0" color="${colors.muted}">You'll get a confirmation email as soon as the parts are reserved and ready to ship.</mj-text>
      </mj-column>
    </mj-section>
    ${trustStrip}
    ${orderNumberBadge}
    ${sectionDivider}
    ${orderLinesWithImages}
    ${orderTotals}
    ${addressBlocksBothColumns}
    ${orderFooterSection}
  </mj-wrapper>
</mj-body>
</mjml>`;

const defaultOrderConfirmedMjmlTemplate = `<mjml>
${mjHead}
<mj-body>
  <mj-wrapper>
    ${accentBar}
    ${orderHeaderSection}
    <mj-section padding="0 24px 8px">
      <mj-column>
        <mj-text font-size="24px" font-weight="700" color="${colors.primary}" padding="0 0 12px">Order confirmed</mj-text>
        <mj-text padding="0 0 8px">Your parts are reserved and we're packing your order now.</mj-text>
        <mj-text padding="0" color="${colors.muted}">We'll send a tracking link as soon as the carrier picks it up.</mj-text>
      </mj-column>
    </mj-section>
    ${trustStrip}
    ${orderNumberBadge}
    ${sectionDivider}
    ${orderLinesWithImages}
    ${orderTotals}
    ${addressBlocksBothColumns}
    ${orderFooterSection}
  </mj-wrapper>
</mj-body>
</mjml>`;

const defaultOrderFulfilledMjmlTemplate = `<mjml>
${mjHead}
<mj-body>
  <mj-wrapper>
    ${accentBar}
    ${orderHeaderSection}
    <mj-section padding="0 24px 8px">
      <mj-column>
        <mj-text font-size="24px" font-weight="700" color="${colors.primary}" padding="0 0 12px">Your parts are on the way</mj-text>
        <mj-text padding="0 0 8px">Your order has shipped and is heading to the address below.</mj-text>
        {{#if order.shippingMethodName}}
        <mj-text padding="0" color="${colors.muted}">Shipped via {{order.shippingMethodName}}</mj-text>
        {{/if}}
        {{#each order.fulfillments}}
          {{#if trackingNumber}}
          <mj-text padding="8px 0 0" color="${colors.text}">
            <strong>Tracking number:</strong> {{trackingNumber}}{{#if (carrierName trackingNumber)}} ({{carrierName trackingNumber}}){{/if}}
          </mj-text>
          {{/if}}
        {{/each}}
      </mj-column>
    </mj-section>
    {{#with (lookup order.fulfillments 0)}}
      {{#if (carrierTrackingUrl trackingNumber)}}
      <mj-section padding="16px 24px 0">
        <mj-column>
          <mj-button href="{{carrierTrackingUrl trackingNumber}}">Track with {{carrierName trackingNumber}}</mj-button>
        </mj-column>
      </mj-section>
      {{/if}}
    {{/with}}
    {{#unless (lookup (lookup order.fulfillments 0) "trackingNumber")}}
      {{#if order.redirectUrl}}
      <mj-section padding="16px 24px 0">
        <mj-column>
          <mj-button href="{{order.redirectUrl}}">View your order</mj-button>
        </mj-column>
      </mj-section>
      {{/if}}
    {{/unless}}
    ${trustStrip}
    ${orderNumberBadge}
    ${sectionDivider}
    ${orderLinesWithImages}
    ${orderTotals}
    ${shippingAddressBlock}
    ${orderFooterSection}
  </mj-wrapper>
</mj-body>
</mjml>`;

const defaultOrderFullyPaidMjmlTemplate = `<mjml>
${mjHead}
<mj-body>
  <mj-wrapper>
    ${accentBar}
    ${orderHeaderSection}
    <mj-section padding="0 24px 8px">
      <mj-column>
        <mj-text font-size="24px" font-weight="700" color="${colors.primary}" padding="0 0 12px">Payment received</mj-text>
        <mj-text padding="0 0 8px">Thanks &mdash; your payment has cleared. We're packing your parts now.</mj-text>
        <mj-text padding="0" color="${colors.muted}">A tracking link follows as soon as the carrier picks the parcel up.</mj-text>
      </mj-column>
    </mj-section>
    ${trustStrip}
    ${orderNumberBadge}
    ${sectionDivider}
    ${orderLinesWithImages}
    ${orderTotals}
    ${addressBlocksBothColumns}
    ${orderFooterSection}
  </mj-wrapper>
</mj-body>
</mjml>`;

const defaultOrderCancelledMjmlTemplate = `<mjml>
${mjHead}
<mj-body>
  <mj-wrapper>
    ${accentBar}
    ${orderHeaderSection}
    <mj-section padding="0 24px 8px">
      <mj-column>
        <mj-text font-size="24px" font-weight="700" color="${colors.primary}" padding="0 0 12px">Order cancelled</mj-text>
        <mj-text padding="0 0 8px">This order has been cancelled. If a payment had been taken, the refund is on its way back to your card.</mj-text>
        <mj-text padding="0" color="${colors.muted}">Didn't request this? Reply to this email and we'll sort it out straight away.</mj-text>
      </mj-column>
    </mj-section>
    ${orderNumberBadge}
    ${sectionDivider}
    ${orderLinesWithImages}
    ${orderTotals}
    ${orderFooterSection}
  </mj-wrapper>
</mj-body>
</mjml>`;

const defaultOrderRefundedMjmlTemplate = `<mjml>
${mjHead}
<mj-body>
  <mj-wrapper>
    ${accentBar}
    ${orderHeaderSection}
    <mj-section padding="0 24px 8px">
      <mj-column>
        <mj-text font-size="24px" font-weight="700" color="${colors.primary}" padding="0 0 12px">Refund processed</mj-text>
        <mj-text padding="0 0 8px">Your refund has been processed and the funds are returning to your original payment method.</mj-text>
        <mj-text padding="0" color="${colors.muted}">Most cards show the refund within 5&ndash;10 business days. SEPA / bank transfers can take a little longer.</mj-text>
      </mj-column>
    </mj-section>
    ${orderNumberBadge}
    ${sectionDivider}
    ${orderLinesWithImages}
    ${orderTotals}
    ${orderFooterSection}
  </mj-wrapper>
</mj-body>
</mjml>`;

const defaultOrderFulfillmentUpdatedMjmlTemplate = `<mjml>
${mjHead}
<mj-body>
  <mj-wrapper>
    ${accentBar}
    ${headerSection}
    <mj-section padding="0 24px 8px">
      <mj-column>
        <mj-text font-size="24px" font-weight="700" color="${colors.primary}" padding="0 0 12px">Shipping update</mj-text>
        <mj-text padding="0 0 8px">There's an update on the shipment for order #{{order.number}}.</mj-text>
        {{#if fulfillment.tracking_number}}
        <mj-text padding="8px 0 0" color="${colors.text}">
          <strong>Tracking number:</strong> {{fulfillment.tracking_number}}{{#if (carrierName fulfillment.tracking_number)}} ({{carrierName fulfillment.tracking_number}}){{/if}}
        </mj-text>
        {{/if}}
      </mj-column>
    </mj-section>
    {{#if (carrierTrackingUrl fulfillment.tracking_number)}}
    <mj-section padding="16px 24px 0">
      <mj-column>
        <mj-button href="{{carrierTrackingUrl fulfillment.tracking_number}}">Track with {{carrierName fulfillment.tracking_number}}</mj-button>
      </mj-column>
    </mj-section>
    {{/if}}
    ${shippingAddressBlockNotify}
    ${footerSection}
  </mj-wrapper>
</mj-body>
</mjml>`;

/*
 * ============================================================
 * INVOICE TEMPLATE
 * ============================================================
 */

const defaultInvoiceSentMjmlTemplate = `<mjml>
${mjHead}
<mj-body>
  <mj-wrapper>
    ${accentBar}
    ${orderHeaderSection}
    <mj-section padding="0 24px 8px">
      <mj-column>
        <mj-text font-size="24px" font-weight="700" color="${colors.primary}" padding="0 0 12px">Your invoice is ready</mj-text>
        <mj-text padding="0 0 8px">A new invoice has been issued for your order{{#if order}} #{{order.number}}{{/if}}.</mj-text>
        <mj-text padding="0" color="${colors.muted}">Tap below to download a PDF copy. Keep it for your records or VAT reclaim.</mj-text>
      </mj-column>
    </mj-section>
    {{#if invoice.url}}
    <mj-section padding="20px 24px 0">
      <mj-column>
        <mj-button href="{{invoice.url}}">Download invoice (PDF)</mj-button>
      </mj-column>
    </mj-section>
    {{/if}}
    ${orderFooterSection}
  </mj-wrapper>
</mj-body>
</mjml>`;

/*
 * ============================================================
 * GIFT CARD TEMPLATE
 * ============================================================
 */

const defaultGiftCardSentMjmlTemplate = `<mjml>
${mjHead}
<mj-body>
  <mj-wrapper>
    ${accentBar}
    ${headerSection}
    <mj-section padding="0 24px 8px">
      <mj-column>
        <mj-text font-size="24px" font-weight="700" color="${colors.primary}" padding="0 0 12px">You've received a gift card</mj-text>
        <mj-text padding="0">Use the code below at checkout to apply your credit toward any part on WWSpares.</mj-text>
      </mj-column>
    </mj-section>
    {{#if giftCard}}
    <mj-section padding="20px 24px 0">
      <mj-column background-color="${colors.panel}" border-radius="8px" padding="24px">
        <mj-text font-size="12px" font-weight="600" color="${colors.muted}" letter-spacing="1px" padding="0 0 8px">YOUR GIFT CARD CODE</mj-text>
        <mj-text font-size="28px" font-weight="700" color="${colors.primary}" letter-spacing="2px" padding="0 0 16px">{{giftCard.displayCode}}</mj-text>
        {{#if giftCard.currentBalance}}
        <mj-text font-size="18px" font-weight="600" color="${colors.primary}" padding="0 0 4px">
          {{giftCard.currentBalance.amount}} {{giftCard.currentBalance.currency}}
        </mj-text>
        <mj-text font-size="14px" color="${colors.muted}" padding="0">Available balance</mj-text>
        {{/if}}
        {{#if giftCard.expiryDate}}
        <mj-text font-size="14px" color="${colors.muted}" padding="16px 0 0">Valid until {{giftCard.expiryDate}}</mj-text>
        {{/if}}
      </mj-column>
    </mj-section>
    {{/if}}
    ${footerSection}
  </mj-wrapper>
</mj-body>
</mjml>`;

/*
 * ============================================================
 * ACCOUNT TEMPLATES (Notify payload — snake_case)
 * ============================================================
 */

const defaultAccountConfirmationMjmlTemplate = `<mjml>
${mjHead}
<mj-body>
  <mj-wrapper>
    ${accentBar}
    ${headerSection}
    <mj-section padding="0 24px 8px">
      <mj-column>
        <mj-text font-size="24px" font-weight="700" color="${colors.primary}" padding="0 0 12px">Activate your WWSpares account</mj-text>
        <mj-text padding="0 0 8px">Hi{{#if user.first_name}} {{user.first_name}}{{/if}} &mdash; thanks for signing up.</mj-text>
        <mj-text padding="0">Click the button below to activate your account. The link is single-use and expires soon.</mj-text>
      </mj-column>
    </mj-section>
    <mj-section padding="20px 24px 0">
      <mj-column>
        <mj-button href="{{confirm_url}}">Activate account</mj-button>
      </mj-column>
    </mj-section>
    <mj-section padding="12px 24px 0">
      <mj-column>
        <mj-text font-size="13px" color="${colors.muted}">Didn't sign up? You can safely ignore this email &mdash; nothing was created.</mj-text>
      </mj-column>
    </mj-section>
    ${footerSection}
  </mj-wrapper>
</mj-body>
</mjml>`;

const defaultAccountPasswordResetMjmlTemplate = `<mjml>
${mjHead}
<mj-body>
  <mj-wrapper>
    ${accentBar}
    ${headerSection}
    <mj-section padding="0 24px 8px">
      <mj-column>
        <mj-text font-size="24px" font-weight="700" color="${colors.primary}" padding="0 0 12px">Reset your password</mj-text>
        <mj-text padding="0 0 8px">Hi{{#if user.first_name}} {{user.first_name}}{{/if}} &mdash; we got a request to reset your WWSpares password.</mj-text>
        <mj-text padding="0">Set a new one with the button below. The link is single-use and expires soon.</mj-text>
      </mj-column>
    </mj-section>
    <mj-section padding="20px 24px 0">
      <mj-column>
        <mj-button href="{{reset_url}}">Set a new password</mj-button>
      </mj-column>
    </mj-section>
    <mj-section padding="12px 24px 0">
      <mj-column>
        <mj-text font-size="13px" color="${colors.muted}">Didn't request this? Ignore this email &mdash; your current password stays in place.</mj-text>
      </mj-column>
    </mj-section>
    ${footerSection}
  </mj-wrapper>
</mj-body>
</mjml>`;

const defaultAccountChangeEmailRequestMjmlTemplate = `<mjml>
${mjHead}
<mj-body>
  <mj-wrapper>
    ${accentBar}
    ${headerSection}
    <mj-section padding="0 24px 8px">
      <mj-column>
        <mj-text font-size="24px" font-weight="700" color="${colors.primary}" padding="0 0 12px">Confirm your new email address</mj-text>
        <mj-text padding="0 0 8px">Hi{{#if user.first_name}} {{user.first_name}}{{/if}} &mdash; you requested to change your sign-in email to <strong>{{new_email}}</strong>.</mj-text>
        <mj-text padding="0">Confirm the change with the button below.</mj-text>
      </mj-column>
    </mj-section>
    <mj-section padding="20px 24px 0">
      <mj-column>
        <mj-button href="{{redirect_url}}">Confirm new email</mj-button>
      </mj-column>
    </mj-section>
    <mj-section padding="12px 24px 0">
      <mj-column>
        <mj-text font-size="13px" color="${colors.muted}">If this wasn't you, ignore this email or contact <a href="mailto:${SUPPORT_EMAIL}" style="color:${colors.primary};">${SUPPORT_EMAIL}</a>.</mj-text>
      </mj-column>
    </mj-section>
    ${footerSection}
  </mj-wrapper>
</mj-body>
</mjml>`;

const defaultAccountChangeEmailConfirmationMjmlTemplate = `<mjml>
${mjHead}
<mj-body>
  <mj-wrapper>
    ${accentBar}
    ${headerSection}
    <mj-section padding="0 24px 8px">
      <mj-column>
        <mj-text font-size="24px" font-weight="700" color="${colors.primary}" padding="0 0 12px">Email address updated</mj-text>
        <mj-text padding="0 0 8px">Hi{{#if user.first_name}} {{user.first_name}}{{/if}} &mdash; your sign-in email has been updated.</mj-text>
        {{#if new_email}}
        <mj-text padding="0">Your new email is <strong>{{new_email}}</strong>.</mj-text>
        {{/if}}
      </mj-column>
    </mj-section>
    <mj-section padding="12px 24px 0">
      <mj-column>
        <mj-text font-size="13px" color="${colors.muted}">If you didn't make this change, contact <a href="mailto:${SUPPORT_EMAIL}" style="color:${colors.primary};">${SUPPORT_EMAIL}</a> immediately.</mj-text>
      </mj-column>
    </mj-section>
    ${footerSection}
  </mj-wrapper>
</mj-body>
</mjml>`;

const defaultAccountDeleteMjmlTemplate = `<mjml>
${mjHead}
<mj-body>
  <mj-wrapper>
    ${accentBar}
    ${headerSection}
    <mj-section padding="0 24px 8px">
      <mj-column>
        <mj-text font-size="24px" font-weight="700" color="${colors.primary}" padding="0 0 12px">Confirm account deletion</mj-text>
        <mj-text padding="0 0 8px">Hi{{#if user.first_name}} {{user.first_name}}{{/if}} &mdash; we got a request to delete your WWSpares account.</mj-text>
        <mj-text padding="0">Click below to confirm. <strong>This cannot be undone.</strong></mj-text>
      </mj-column>
    </mj-section>
    <mj-section padding="20px 24px 0">
      <mj-column>
        <mj-button href="{{delete_url}}" background-color="${colors.danger}">Delete my account</mj-button>
      </mj-column>
    </mj-section>
    <mj-section padding="12px 24px 0">
      <mj-column>
        <mj-text font-size="13px" color="${colors.muted}">Didn't request this? Ignore this email &mdash; your account stays active.</mj-text>
      </mj-column>
    </mj-section>
    ${footerSection}
  </mj-wrapper>
</mj-body>
</mjml>`;

/*
 * ============================================================
 * EXPORTS
 * ============================================================
 */

export const defaultMjmlTemplates: Record<MessageEventTypes, string> = {
  ACCOUNT_CHANGE_EMAIL_CONFIRM: defaultAccountChangeEmailConfirmationMjmlTemplate,
  ACCOUNT_CHANGE_EMAIL_REQUEST: defaultAccountChangeEmailRequestMjmlTemplate,
  ACCOUNT_CONFIRMATION: defaultAccountConfirmationMjmlTemplate,
  ACCOUNT_DELETE: defaultAccountDeleteMjmlTemplate,
  ACCOUNT_PASSWORD_RESET: defaultAccountPasswordResetMjmlTemplate,
  GIFT_CARD_SENT: defaultGiftCardSentMjmlTemplate,
  INVOICE_SENT: defaultInvoiceSentMjmlTemplate,
  ORDER_CANCELLED: defaultOrderCancelledMjmlTemplate,
  ORDER_CONFIRMED: defaultOrderConfirmedMjmlTemplate,
  ORDER_CREATED: defaultOrderCreatedMjmlTemplate,
  ORDER_FULFILLED: defaultOrderFulfilledMjmlTemplate,
  ORDER_FULFILLMENT_UPDATE: defaultOrderFulfillmentUpdatedMjmlTemplate,
  ORDER_FULLY_PAID: defaultOrderFullyPaidMjmlTemplate,
  ORDER_REFUNDED: defaultOrderRefundedMjmlTemplate,
};

export const defaultMjmlSubjectTemplates: Record<MessageEventTypes, string> = {
  ACCOUNT_CHANGE_EMAIL_CONFIRM: "Your WWSpares email has been updated",
  ACCOUNT_CHANGE_EMAIL_REQUEST: "Confirm your new WWSpares email",
  ACCOUNT_CONFIRMATION: "Activate your WWSpares account",
  ACCOUNT_DELETE: "Confirm WWSpares account deletion",
  ACCOUNT_PASSWORD_RESET: "Reset your WWSpares password",
  GIFT_CARD_SENT: "You've received a WWSpares gift card",
  INVOICE_SENT: "Your invoice for order #{{order.number}}",
  ORDER_CANCELLED: "Order #{{order.number}} cancelled",
  ORDER_CONFIRMED: "Order #{{order.number}} confirmed — packing now",
  ORDER_CREATED: "Order #{{order.number}} received — checking stock",
  ORDER_FULFILLED: "Order #{{order.number}} shipped — your parts are on the way",
  ORDER_FULFILLMENT_UPDATE: "Shipping update for order #{{order.number}}",
  ORDER_FULLY_PAID: "Payment received for order #{{order.number}}",
  ORDER_REFUNDED: "Refund processed for order #{{order.number}}",
};
