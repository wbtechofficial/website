import type { OnboardingFormData } from "@/@module/home/schemas/onboarding.schema";
import { apiClient } from "@/integrations/axios/client";

export interface RegisteredCountResponse {
  count: number;
}

export interface JoinCommunityResponse {
  success: boolean;
  message: string;
}

export const onboardingService = {
  async submit(data: OnboardingFormData): Promise<JoinCommunityResponse> {
    const response = await apiClient.post<JoinCommunityResponse>(
      "/onboarding",
      data,
    );
    return response.data;
  },

  async getRegisteredCount(): Promise<number> {
    try {
      const response = await apiClient.get<RegisteredCountResponse>(
        "/onboarding/registered-user-count",
        {
          params: { _t: Date.now() },
          headers: {
            "Cache-Control": "no-cache",
            Pragma: "no-cache",
          },
        },
      );
      return typeof response.data?.count === "number" ? response.data.count : 0;
    } catch (error) {
      console.error("onboardingService.getRegisteredCount error:", error);
      return 0;
    }
  },
};
