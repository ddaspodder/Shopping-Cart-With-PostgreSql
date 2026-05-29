const camelToSnakeCase = (str) => {
  return str.replace(/([A-Z])/g, "_$1").toLowerCase();
};

const buildPartialQuery = (data, joiner = ",", startingIndex = 1) => {
  const fields = Object.keys(data).map(
    (key, index) => `${camelToSnakeCase(key)}=$${index + startingIndex}`,
  );
  return { queryPart: fields.join(` ${joiner} `), values: Object.values(data) };
};

const buildWhereClause = (data) => {
  if (!data || Object.keys(data).length === 0)
    return { queryPart: "", values: [] };

  const fields = Object.keys(data).map((key, index) =>
    typeof data[key] === "object" && "pattern" in data[key]
      ? `${camelToSnakeCase(key)} ILIKE $${index + 1}`
      : `${camelToSnakeCase(key)}=$${index + 1}`,
  );

  const values = Object.values(data).map((value) =>
    typeof value === "object" && "pattern" in value
      ? `%${value.pattern}%`
      : value,
  );
  return {
    queryPart: `WHERE ${fields.join("AND")}`,
    values,
  };
};

const buildUpdateClause = (data) => {
  if (!data || Object.keys(data).length === 0)
    throw new Error("No data provided for update");
  const { queryPart, values } = buildPartialQuery(data, ",", 1);
  return { queryPart: `UPDATE ${queryPart}`, values };
};

const buildSortClause = (sort = []) => {
  if (sort.length === 0) return "";

  const queryPart = sort.map(
    ({ field, direction }) =>
      `${camelToSnakeCase(field)} ${direction.toUpperCase()}`,
  );

  return `ORDER BY ${queryPart.join(",")}`;
};

const buildFilterClause = (data) => {
  const filterCount = Object.keys(data).length;

  if (!data || filterCount === 0) return { queryPart: "", values: [] };

  const filter = Object.keys(data).map((key, index) =>
    typeof data[key] === "object" && "pattern" in data[key]
      ? `${camelToSnakeCase(key)} ILIKE $${index + 1}`
      : `${camelToSnakeCase(key)}=$${index + 1}`,
  );

  const values = Object.values(data).map((value) =>
    typeof value === "object" && "pattern" in value
      ? `%${value.pattern}%`
      : value,
  );
  return {
    queryPart: `WHERE ${filter.join(" AND ")}`,
    values,
  };
};

module.exports = {
  camelToSnakeCase,
  buildPartialQuery,
  buildWhereClause,
  buildUpdateClause,
  buildSortClause,
  buildFilterClause,
};
