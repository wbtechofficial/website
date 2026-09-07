import type { OnboardingFormData } from "@/@module/home/schemas/onboarding.schema";
import { apiClient } from "@/integrations/axios/client";

export const onboardingService = {
  async submit(data: OnboardingFormData) {
    const response = await apiClient.post("/onboarding", data);
    return response.data;
  },
};
