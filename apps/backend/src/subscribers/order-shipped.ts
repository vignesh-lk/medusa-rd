import type { SubscriberArgs, SubscriberConfig } from '@medusajs/framework';
import { Modules } from '@medusajs/framework/utils';

export default async function orderShippedHandler({
  event: { data },
  container,
}: SubscriberArgs<{ id: string; no_notification: boolean }>) {
  if (data.no_notification) {
    return;
  }

  const query = container.resolve('query');
  const notificationModuleService = container.resolve(Modules.NOTIFICATION);

  // Retrieve the fulfillment and its associated order
  const {
    data: [fulfillment],
  } = await query.graph({
    entity: 'fulfillment',
    fields: [
      'id',
      'order.id',
      'order.email',
      'order.display_id',
      'order.currency_code',
      'order.items.*',
      'order.shipping_address.*',
      'order.customer.*',
    ],
    filters: {
      id: data.id,
    },
  });

  if (!fulfillment?.order?.email) {
    return;
  }

  await notificationModuleService.createNotifications({
    to: fulfillment.order.email,
    channel: 'email',
    template: 'order-shipped',
    data: {
      order: fulfillment.order,
      fulfillment_id: fulfillment.id,
    },
  });
}

export const config: SubscriberConfig = {
  event: 'shipment.created',
};
