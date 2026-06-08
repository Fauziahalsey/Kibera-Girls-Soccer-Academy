declare module 'flutterwave-react-v3' {
  export interface FlutterwaveConfig {
    public_key: string;
    tx_ref: string;
    amount: number;
    currency: string;
    payment_options: string;
    customer: {
      email: string;
      phone_number: string;
      name: string;
    };
    customizations: {
      title: string;
      description: string;
      logo: string;
    };
    [key: string]: unknown;
  }

  export interface FlutterwaveResponse {
    status: string;
    transaction_id?: number;
    tx_ref?: string;
    [key: string]: unknown;
  }

  export function useFlutterwave(
    config: FlutterwaveConfig
  ): (options: {
    callback: (response: FlutterwaveResponse) => void;
    onClose: () => void;
  }) => void;

  export function closePaymentModal(): void;
}
