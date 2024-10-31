declare global {
  interface Window {
    _woopriceman: {
      admin_url: string;
      rest_api_url: string;
      rest_api_admin_namespace_v1: string;
      rest_api_admin_nonce: string;
      translations: {
        [key: string]: string;
      };
    };
  }
}

export type TApiRequest = {
  data: Record<string, any>;
};

export type TApiResponse = {
  status: "success" | "error";
};

// =====================================================================================================================

export type TPriceRuleConditionUsersApplyToAllUsers = {
  type: "users";
  apply_to: "all";
};

export type TPriceRuleConditionUsersApplyToSpecificUsers = {
  type: "users";
  apply_to: "specific_users";
  users: {
    id: string;
    name: string;
  }[];
};

export type TPriceRuleConditionUsersApplyToLoggedInUsers = {
  type: "users";
  apply_to: "logged_in_users";
};

export type TPriceRuleConditionRolesApplyToSpecificRoles = {
  type: "roles";
  apply_to: "specific_roles";
  roles: {
    id: string;
    name: string;
  }[];
};

export type TPriceRuleConditionProductsApplyToAllProducts = {
  type: "products";
  apply_to: "all";
};

export type TPriceRuleConditionProductsApplyToSpecificProducts = {
  type: "products";
  apply_to: "specific_products";
  products: {
    id: string;
    name: string;
  }[];
};

export type TPriceRule = {
  discount_type: "percentage" | "amount";
  increase_decrease: "increase" | "decrease";
  amount: number;
  conditions?:
    | { type: "" }[]
    | TPriceRuleConditionUsersApplyToAllUsers[]
    | TPriceRuleConditionUsersApplyToSpecificUsers[]
    | TPriceRuleConditionUsersApplyToLoggedInUsers[]
    | TPriceRuleConditionRolesApplyToSpecificRoles[]
    | TPriceRuleConditionProductsApplyToAllProducts[]
    | TPriceRuleConditionProductsApplyToSpecificProducts[];
};

export type TPrice = {
  id: string;
  name: string;
  enabled: boolean;
  rules: TPriceRule[];
};

// =====================================================================================================================

export type TAddPriceApiRequest = TApiRequest & {
  data: {
    name: string;
  };
};

export type TAddPriceApiResponse = TApiResponse & {
  data: TPrice;
};

// =====================================================================================================================

export type TGetAllPricesApiResponse = TApiResponse & {
  data: TPrice[];
};

// =====================================================================================================================

export type TGetPriceApiResponse = TApiResponse & {
  data: TPrice;
};

// =====================================================================================================================

export type TGetUsersByFilterApiResponse = TApiResponse & {
  data: {
    users: {
      id: string;
      name: string;
      e_mail: string;
    }[];
  };
};

// =====================================================================================================================

export type TGetProductsByFilterApiResponse = TApiResponse & {
  data: {
    products: {
      id: string;
      name: string;
    }[];
  };
};

// =====================================================================================================================

export type TGetAllWPUsersRolesApiResponse = TApiResponse & {
  data: {
    users_roles: {
      id: string;
      name: string;
    }[];
  };
};

// =====================================================================================================================

export type TUpdatePriceApiRequest = TApiRequest & {
  data: TPrice;
};

export type TUpdatePriceApiResponse = TApiResponse & {
  data: TPrice;
};

// =====================================================================================================================

export type TRemovePriceApiRequest = TApiRequest & {
  data: {
    id: number;
  };
};

export type TRemovePriceApiResponse = TApiResponse & {};

// =====================================================================================================================

export type TSettings = {
  calculate_price_by: "regular_price" | "sale_price";
};

// =====================================================================================================================

export type TUpdateSettingsApiRequest = TApiRequest & {
  data: TSettings;
};

export type TUpdateSettingsApiResponse = TApiRequest & {
  data: TSettings;
};

// =====================================================================================================================

export type TGetSettingsApiResponse = TApiResponse & {
  data: TSettings;
};

// =====================================================================================================================

export type TLicense = {
  key: string;
};

// =====================================================================================================================

export type TGetLicenseApiResponse = TApiResponse & {
  data: TLicense & {
    license_response_body: { activated: boolean };
  };
};

// =====================================================================================================================
