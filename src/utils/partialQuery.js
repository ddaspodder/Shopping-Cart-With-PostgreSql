const camelToSnakeCase = (str) => {
  return str.replace(/([A-Z])/g, "_$1").toLowerCase();
};

const getPartialQuery = (data, joiner = ",", startingIndex = 1) => {
  const fields = Object.keys(data).map(
    (key, index) => `${camelToSnakeCase(key)}=$${index + startingIndex}`,
  );
  return { queryPart: fields.join(` ${joiner} `), values: Object.values(data) };
};

const getWhereClause = (data) => {
  if (!data || Object.keys(data).length === 0)
    return { queryPart: "", values: [] };
  const { queryPart, values } = getPartialQuery(data, "AND", 1);
  return { queryPart: `WHERE ${queryPart}`, values };
};

const getUpdateClause = (data) => {
  if (!data || Object.keys(data).length === 0)
    throw new Error("No data provided for update");
  const { queryPart, values } = getPartialQuery(data, ",", 1);
  return { queryPart: `SET ${queryPart}`, values };
};

module.exports = {
  camelToSnakeCase,
  getPartialQuery,
  getWhereClause,
  getUpdateClause,
};
