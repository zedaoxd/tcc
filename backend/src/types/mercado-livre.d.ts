/* eslint-disable @typescript-eslint/no-unused-vars */

namespace MercadoPago {
  type PaymentCreateRequest = {
    additional_info?: AdditionalInfo;
    application_fee?: string;
    binary_mode?: boolean;
    callback_url?: string;
    campaign_id?: string;
    capture?: boolean;
    coupon_amount?: number;
    coupon_code?: string;
    date_of_expiration?: string;
    description?: string;
    differential_pricing_id?: number;
    external_reference?: string;
    installments?: number;
    issuer_id?: number;
    metadata?: any;
    notification_url?: string;
    payment_method_id?: string;
    statement_descriptor?: string;
    token?: string;
    transaction_amount?: number;
    payer?: PayerRequest;
    point_of_interaction?: PointOfInteractionRequest;
    sponsor_id?: number;
    transaction_details?: TransactionDetailsRequest;
  };

  type TransactionDetailsRequest = {
    financial_institution?: string;
  };

  type SubscriptionSequenceRequest = {
    number?: number;
    total?: number;
  };

  type InvoicePeriodRequest = {
    period?: number;
    type?: string;
  };

  type PaymentReferenceRequest = {
    id?: string;
  };

  type TransactionDataRequest = {
    first_time_use?: boolean;
    subscription_sequence?: SubscriptionSequenceRequest;
    subscription_id?: string;
    invoice_period?: InvoicePeriodRequest;
    payment_reference?: PaymentReferenceRequest;
    billing_date?: string;
  };

  type PointOfInteractionRequest = {
    linkedTo?: string;
    type?: string;
    transaction_data?: TransactionDataRequest;
  };

  type Identification = {
    type?: string;
    number?: string;
  };

  type Address = {
    zip_code?: string;
    street_name?: string;
    street_number?: number;
  };

  type AddressRequest = Address & {
    neighborhood?: string;
    city?: string;
    federal_unit?: string;
  };

  type PayerRequest = {
    type?: string;
    id?: string;
    email?: string;
    identification?: Identification;
    phone?: Phone;
    first_name?: string;
    last_name?: string;
    entity_type?: string;
    address?: AddressRequest;
  };

  type Items = {
    id: string;
    title: string;
    description?: string;
    picture_url?: string;
    category_id?: string;
    quantity: number;
    currency_id?: string;
    unit_price: number;
  };

  type Payer = {
    type?: string;
    id?: string;
    operator_id?: any;
    email?: string;
    identification?: Identification;
    phone?: Phone;
    first_name?: string;
    last_name?: string;
    entity_type?: string;
    address?: Address;
  };

  type FreeMethods = {
    id?: number;
  };

  type ReceiverAddress = {
    zip_code?: string;
    street_name?: string;
    street_number?: number;
    floor?: string;
    apartment?: string;
    city_name?: string;
    state_name?: string;
    country_name?: string;
  };

  type Shipments = {
    mode?: string;
    local_pickup?: boolean;
    dimensions?: string;
    default_shipping_method?: number;
    free_methods?: Array<FreeMethods>;
    cost?: number;
    free_shipping?: boolean;
    receiver_address?: ReceiverAddress;
    express_shipment?: boolean;
  };

  type AdditionalInfo = {
    ip_address?: string;
    items?: Array<Items>;
    payer?: Payer;
    shipments?: Shipments;
  };

  type Options = {
    timeout?: number;
    idempotencyKey?: string;
    plataformId?: string;
    integratorId?: string;
    corporationId?: string;
  };

  type PaymentCreateData = {
    body: PaymentCreateRequest;
    requestOptions?: Options;
  };

  type ResponseFields = {
    status: number;
    headers: [string, string[]];
  };

  type ApiResponse = {
    api_response: ResponseFields;
  };

  type PaymentMethod = {
    id?: string;
    type?: string;
    issuer_id?: string;
    data?: Data;
  };

  type PaymentOrder = {
    id?: number;
    type?: string;
  };

  type FeeDetails = {
    type?: string;
    amount?: number;
    fee_payer?: string;
  };

  type Accounts = {
    from?: string;
    to?: string;
  };

  type Amounts = {
    original?: number;
    refunded?: number;
  };

  type ChargesDetails = {
    id?: string;
    name?: string;
    type?: string;
    accounts?: Accounts;
    client_id?: number;
    date_created?: string;
    last_updated?: string;
    amounts?: Amounts;
    metadata?: any;
    reserve_id?: any;
    refund_charges?: any[];
  };

  type Cardholder = {
    name?: string;
    identification?: Identification;
  };

  type Card = {
    id?: string;
    first_six_digits?: string;
    last_four_digits?: string;
    bin?: string;
    expiration_month?: number;
    expiration_year?: number;
    date_created?: string;
    date_last_updated?: string;
    cardholder?: Cardholder;
  };

  type RefundResponse = ApiResponse & {
    id?: number;
    payment_id?: number;
    amount?: number;
    metadata?: any;
    source?: Source;
    date_created?: string;
    unique_sequence_number?: string;
    refund_mode?: string;
    adjustment_amount?: number;
    status?: string;
    reason?: string;
    amount_refunded_to_payer?: number;
  };

  type PaymentResponse = ApiResponse & {
    id?: number;
    date_created?: string;
    date_approved?: string;
    date_last_updated?: string;
    date_of_expiration?: string;
    money_release_date?: string;
    money_release_schema?: string;
    money_release_status?: string;
    operation_type?: string;
    issuer_id?: string;
    payment_method_id?: string;
    payment_type_id?: string;
    payment_method?: PaymentMethod;
    status?: string;
    status_detail?: string;
    currency_id?: string;
    description?: string;
    live_mode?: boolean;
    sponsor_id?: number;
    authorization_code?: string;
    integrator_id?: string;
    taxes_amount?: number;
    counter_currency?: string;
    shipping_amount?: number;
    build_version?: string;
    pos_id?: string;
    store_id?: string;
    platform_id?: string;
    corporation_id?: string;
    payer?: Payer;
    collector_id?: number;
    metadata?: any;
    additional_info?: AdditionalInfo;
    order?: PaymentOrder;
    external_reference?: string;
    transaction_amount?: number;
    transaction_amount_refunded?: number;
    coupon_amount?: number;
    differential_pricing_id?: string;
    deduction_schema?: string;
    installments?: number;
    transaction_details?: TransactionDetails;
    fee_details?: Array<FeeDetails>;
    charges_details?: Array<ChargesDetails>;
    captured?: boolean;
    binary_mode?: boolean;
    call_for_authorize_id?: string;
    statement_descriptor?: string;
    card?: Card;
    notification_url?: string;
    refunds?: Array<RefundResponse>;
    processing_mode?: string;
    merchant_account_id?: string;
    merchant_number?: string;
    point_of_interaction?: PointOfInteraction;
    three_ds_info?: ThreeDSInfo;
    callback_url?: string;
    coupon_code?: string;
    net_amount?: number;
    payment_method_option_id?: string;
    taxes?: Array<Tax>;
    internal_metadata?: any;
  };

  type Tax = {
    type?: string;
    value?: number;
  };

  type ThreeDSInfo = {
    external_resource_url?: string;
    creq?: string;
  };

  type PointOfInteraction = {
    type?: string;
    sub_type?: string;
    linked_to?: string;
    application_data?: ApplicationData;
    transaction_data?: TransactionData;
    business_info?: BusinessInfo;
  };

  type TransactionData = {
    qr_code?: string;
    qr_code_base64?: string;
    transaction_id?: string;
    bank_transfer_id?: number;
    financial_institution?: number;
    bank_info?: BankInfo;
    ticket_url?: string;
  };

  type ApplicationData = {
    version?: string;
    name?: string;
  };
}
