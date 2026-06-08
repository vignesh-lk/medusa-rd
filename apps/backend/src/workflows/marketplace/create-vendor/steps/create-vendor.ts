import { createStep, StepResponse } from '@medusajs/framework/workflows-sdk';
import MarketplaceModuleService from '../../../../modules/marketplace/service';
import { MARKETPLACE_MODULE } from '../../../../modules/marketplace/index';

type CreateVendorStepInput = {
  name: string;
  handle?: string;
  logo?: string;
};

const createVendorStep = createStep(
  'create-vendor',
  async (vendorData: CreateVendorStepInput, { container }) => {
    const marketplaceModuleService: MarketplaceModuleService =
      container.resolve(MARKETPLACE_MODULE);
    const vendor = await marketplaceModuleService.createVendors(vendorData);
    return new StepResponse(vendor);
  },
  async (VendorId, { container }) => {
    if (!VendorId) {
      return;
    }
    const marketplaceModuleService: MarketplaceModuleService =
      container.resolve(MARKETPLACE_MODULE);
    marketplaceModuleService.deleteVendors(VendorId);
  },
);

export default createVendorStep;
