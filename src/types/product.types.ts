export interface GetAllProductsQuery {
  search?: string;
  sort?: string;
  limit?: string;
  offset?: string;
  name?: string;
  price_min?: string;
  price_max?: string;
}

interface Pattern {
  contains: string;
  mode: "insensitive";
}

interface Range {
  gte?: number;
  lte?: number;
}
export interface ProductFilters {
  name?: string | Pattern;
  price?: Range;
}

export interface ProductSort {
  field: "name" | "price";
  direction: "asc" | "desc";
}

export interface FindAllProductsOptions {
  filters: ProductFilters;
  sort: ProductSort[];
  limit?: number;
  offset?: number;
}

export interface FindAllProductsParsedOptions extends Pick<
  FindAllProductsOptions,
  "sort" | "limit" | "offset"
> {
  filters: ProductFilters;
}

export interface CreateProductBody {
  name: string;
  price: number;
}

export interface CreateProductInput extends CreateProductBody {
  isActive?: boolean;
}

export interface UpdateProductBody {
  name?: string;
  price?: number;
}

export interface UpdateProductInput extends UpdateProductBody {
  isActive?: boolean;
}

export interface ProductRow {
  id: number;
  name: string;
  price: number;
  is_active: boolean;
}

export interface ProductResponse {
  id: string;
  name: string;
  price: number;
}
