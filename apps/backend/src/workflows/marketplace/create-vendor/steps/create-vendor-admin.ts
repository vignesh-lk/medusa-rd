import { createStep, StepResponse } from '@medusajs/framework/workflows-sdk';
import MarketplaceModuleService from '../../../../modules/marketplace/service';
import { MARKETPLACE_MODULE } from '../../../../modules/marketplace/index';

type CreateVendorAdminStepInput = {
  email: string;
  first_name?: string;
  last_name?: string;
  vendor_id?: string;
};

const createVendorAdminStep = createStep(
  'create-vendor-admin',
  async (adminData: CreateVendorAdminStepInput, { container }) => {
    const markerplaceModuleService: MarketplaceModuleService =
      container.resolve(MARKETPLACE_MODULE);
    const vendorAdmin =
      await markerplaceModuleService.createVendorAdmins(adminData);

    return new StepResponse(vendorAdmin);
  },
  async (VendorAdminId, { container }) => {
    if (!VendorAdminId) {
      return;
    }
    const markerplaceModuleService: MarketplaceModuleService =
      container.resolve(MARKETPLACE_MODULE);
    markerplaceModuleService.deleteVendorAdmins(VendorAdminId);
  },
);

export default createVendorAdminStep;
