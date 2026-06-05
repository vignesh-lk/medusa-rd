import type { SubscriberArgs, SubscriberConfig } from '@medusajs/framework';
import { Modules } from '@medusajs/framework/utils';

export default async function customerCreatedHandler({
  event: { data },
  container,
}: SubscriberArgs<{ id: string }>) {
  const query = container.resolve('query');
  const notificationModuleService = container.resolve(Modules.NOTIFICATION);

  const {
    data: [customer],
  } = await query.graph({
    entity: 'customer',
    fields: ['id', 'email', 'first_name', 'last_name'],
    filters: {
      id: data.id,
    },
  });

  if (!customer?.email) {
    return;
  }

  await notificationModuleService.createNotifications({
    to: customer.email,
    channel: 'email',
    template: 'customer-welcome',
    data: {
      first_name: customer.first_name,
      email: customer.email,
    },
  });
}

export const config: SubscriberConfig = {
  event: 'customer.created',
};
