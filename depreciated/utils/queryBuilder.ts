export const camelToSnakeCase = (str: string) => {
  return str.replace(/([A-Z])/g, "_$1").toLowerCase();
};

export const buildPartialQuery = (
  data: object,
  joiner = ",",
  startingIndex = 1,
) => {
  const fields = Object.keys(data).map(
    (key, index) => `${camelToSnakeCase(key)}=$${index + startingIndex}`,
  );
  return { queryPart: fields.join(` ${joiner} `), values: Object.values(data) };
};

export const buildWhereClause = <T extends object>(data: T) => {
  if (!data || Object.keys(data).length === 0)
    return { queryPart: "", values: [] };

  const fields = Object.keys(data).map((key, index) => {
    const typedKey = key as keyof T;
    return typeof data[typedKey] === "object" &&
      data[typedKey] &&
      "pattern" in data[typedKey]
      ? `${camelToSnakeCase(key)} ILIKE $${index + 1}`
      : `${camelToSnakeCase(key)}=$${index + 1}`;
  });

  const values = Object.values(data).map((value) =>
    typeof value === "object" && value && "pattern" in value
      ? `%${value.pattern}%`
      : value,
  );
  return {
    queryPart: `WHERE ${fields.join(" AND ")}`,
    values,
  };
};

export const buildUpdateClause = <T extends object>(data: T) => {
  if (!data || Object.keys(data).length === 0)
    throw new Error("No data provided for update");
  const { queryPart, values } = buildPartialQuery(data, ",", 1);
  return { queryPart: `SET ${queryPart}`, values };
};

export const buildSortClause = (
  sort: { field: string; direction: string }[] = [],
) => {
  if (sort.length === 0) return "";

  const queryPart = sort.map(
    ({ field, direction }) =>
      `${camelToSnakeCase(field)} ${direction.toUpperCase()}`,
  );

  return `ORDER BY ${queryPart.join(",")}`;
};

export const buildFilterClause = <T extends object>(data: T) => {
  const filterCount = Object.keys(data).length;

  if (!data || filterCount === 0) return { queryPart: "", values: [] };

  const filter = Object.keys(data).map((key, index) => {
    const typedKey = key as keyof T;
    return typeof data[typedKey] === "object" &&
      data[typedKey] &&
      "pattern" in data[typedKey]
      ? `${camelToSnakeCase(key)} ILIKE $${index + 1}`
      : `${camelToSnakeCase(key)}=$${index + 1}`;
  });

  const values = Object.values(data).map((value) =>
    typeof value === "object" && value && "pattern" in value
      ? `%${value.pattern}%`
      : value,
  );
  return {
    queryPart: `WHERE ${filter.join(" AND ")}`,
    values,
  };
};
