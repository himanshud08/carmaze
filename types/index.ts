export interface HomeProps {
    searchParams: FilterProps;
  }
  export interface FilterProps {
    manufacturer?: string;
    year?: number;
    model?: string;
    limit?: number;
    fuel?: string;
  }