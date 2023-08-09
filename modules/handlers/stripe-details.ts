import { ZuploContext, ZuploRequest } from "@zuplo/runtime";
import { getUserInfo } from "../utils/user-info";
import { getStripeSubscriptionByEmail } from "../services/stripe";
import { ErrorResponse } from "../types";

export async function stripeActiveSubscription(
  request: ZuploRequest,
  context: ZuploContext,
) {
  const userInfo = await getUserInfo(request, context);

  if (userInfo instanceof ErrorResponse) {
    return userInfo;
  }

  return await getStripeSubscriptionByEmail({
    customerEmail: userInfo.email,
    logger: context.log,
  });
}
