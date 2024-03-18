// Type definitions for node-sql-parser 1.0
// Project: https://github.com/taozhi8833998/node-sql-parser#readme
// Definitions by: taozhi8833998 <https://github.com/taozhi8833998>
// Definitions: https://github.com/DefinitelyTyped/DefinitelyTyped
// TypeScript Version: 2.4

export interface With {
  name: { value: string };
  stmt: {
    _parentheses?: boolean;
    tableList: string[];
    columnList: string[];
    ast: Select;
  };
  columns?: any[];
}
import { LocationRange } from "pegjs";

export { LocationRange, Location } from "pegjs";

export type WhilteListCheckMode = "table" | "column";
export interface ParseOptions {
  includeLocations?: boolean;
}
export interface Option {
  database?: string;
  type?: string;
  trimQuery?: boolean;
  parseOptions?: ParseOptions;
}
export interface TableColumnAst {
  tableList: string[];
  columnList: string[];
  ast: AST[] | AST;
  loc?: LocationRange;
}
export interface BaseFrom {
  db: string | null;
  table: string;
  as: string | null;
  schema?: string;
  loc?: LocationRange;
}
export interface Join extends BaseFrom {
	join: "INNER JOIN" | "LEFT JOIN" | "RIGHT JOIN";
	using?: string[];
	on?: Expr;
}
export interface TableExpr {
	expr: {
		ast: Select;
	},
	as?: string | null;
}
export interface Dual {
  type: "dual";
  loc?: LocationRange;
}
export type From = BaseFrom | Join | TableExpr | Dual;
export interface LimitValue {
  type: string;
  value: number;
  loc?: LocationRange;
}
export interface Limit {
  seperator: string;
  value: LimitValue[];
  loc?: LocationRange;
}
export interface OrderBy {
  type: "ASC" | "DESC";
  expr: any;
  loc?: LocationRange;
}

export interface ValueExpr<T = string | number | boolean> {
  type: "backticks_quote_string" | "string" | "regex_string" | "hex_string" | "full_hex_string" | "natural_string" | "bit_string" | "double_quote_string" | "single_quote_string" | "boolean" | "bool" | "null" | "star" | "param" | "origin" | "date" | "datetime" | "time" | "timestamp" | "var_string";
  value: T;
}

export interface ColumnRef {
  type: "column_ref";
  table: string | null;
  column: string | { expr: ValueExpr };
  loc?: LocationRange;
}
export interface SetList {
  column: string;
  value: any;
  table: string | null;
  loc?: LocationRange;
}
export interface InsertReplaceValue {
  type: "expr_list";
  value: any[];
  loc?: LocationRange;
}

export interface Star {
  type: "star";
  value: "*" | "";
  loc?: LocationRange;
}
export interface Case {
  type: "case";
  expr: null;
  args: Array<{
    cond: Expr;
    result: ExpressionValue;
    type: "when";
  } | {
    result: ExpressionValue;
    type: "else";
  }>;
}
export interface Cast {
  type: "cast";
  keyword: "cast";
  expr: Expr;
  symbol: "as";
  target: {
    dataType: string;
    suffix: unknown[];
  }
}
export interface AggrFunc {
  type: "aggr_func";
  name: string;
  args: {
    expr: ExpressionValue;
    distinct: "DISTINCT" | null;
    orderby: OrderBy[] | null;
    parentheses?: boolean;
  };
  loc?: LocationRange;
}

export type FunctionName = { schema?: string, name: ValueExpr<string>[] }
export interface Function {
  type: "function";
  name: FunctionName;
  args?: ExprList;
  suffix?: any;
  loc?: LocationRange;
}
export interface Column {
  expr: ExpressionValue;
  as: string | null;
  type?: string;
  loc?: LocationRange;
}

export type Param = { type: "param"; value: string, loc?: LocationRange; };

export type Value = { type: string; value: any, loc?: LocationRange; };

export type ExpressionValue = ColumnRef | Param | Function | Case | AggrFunc | Value | Cast;
export type Expr =
  | {
    type: "binary_expr";
    operator: "AND" | "OR";
    left: Expr;
    right: Expr;
    loc?: LocationRange;
  }
  | {
    type: "binary_expr";
    operator: string;
    left: ExpressionValue;
    right: ExpressionValue | ExprList;
    loc?: LocationRange;
  };

export type ExprList = {
  type: "expr_list";
  value: ExpressionValue[];
  loc?: LocationRange;
};
export interface Select {
  with: With[] | null;
  type: "select";
  options: any[] | null;
  distinct: "DISTINCT" | null;
  columns: any[] | Column[];
  from: From[] | null;
  where: Expr | Function | null;
  groupby: ColumnRef[] | null;
  having: any[] | null;
  orderby: OrderBy[] | null;
  limit: Limit | null;
  _orderby?: OrderBy[] | null;
  _limit?: Limit | null;
  parentheses_symbol?: boolean;
  _parentheses?: boolean;
  loc?: LocationRange;
}
export interface Insert_Replace {
  type: "replace" | "insert";
  db: string | null;
  table: any;
  columns: string[] | null;
  values: InsertReplaceValue[];
  loc?: LocationRange;
}
export interface Update {
  type: "update";
  db: string | null;
  table: Array<From | Dual> | null;
  set: SetList[];
  where: Expr | Function | null;
  loc?: LocationRange;
}
export interface Delete {
  type: "delete";
  table: any;
  from: Array<From | Dual>;
  where: Expr | Function | null;
  loc?: LocationRange;
}

export interface Alter {
  type: "alter";
  table: From[];
  expr: any;
  loc?: LocationRange;
}

export interface Use {
  type: "use";
  db: string;
  loc?: LocationRange;
}

export interface Create {
  type: "create";
  keyword: "table" | "index" | "database";
  temporary?: "temporary" | null;
  table?: { db: string; table: string }[];
  if_not_exists?: "if not exists" | null;
  like?: {
    type: "like";
    table: string;
    parentheses?: boolean;
  } | null;
  ignore_replace?: "ignore" | "replace" | null;
  as?: string | null;
  query_expr?: any | null;
  create_definitions?: any[] | null;
  table_options?: any[] | null;
  index_using?: {
    keyword: "using";
    type: "btree" | "hash";
  } | null;
  index?: string | null;
  on_kw?: "on" | null;
  index_columns?: any[] | null;
  index_type?: "unique" | "fulltext" | "spatial" | null;
  index_options?: any[] | null;
  algorithm_option?: {
    type: "alter";
    keyword: "algorithm";
    resource: "algorithm";
    symbol: "=" | null;
    algorithm: "default" | "instant" | "inplace" | "copy";
  } | null;
  lock_option?: {
    type: "alter";
    keyword: "lock";
    resource: "lock";
    symbol: "=" | null;
    lock: "default" | "none" | "shared" | "exclusive";
  } | null;
  database?: string;
  loc?: LocationRange;
}

export interface Drop {
  type: "drop";
  keyword: string;
  name: any[];
}

export type AST =
  | Use
  | Select
  | Insert_Replace
  | Update
  | Delete
  | Alter
  | Create
  | Drop;

export class Parser {
  constructor();

  parse(sql: string, opt?: Option): TableColumnAst;

  astify(sql: string, opt?: Option): AST[] | AST;

  sqlify(ast: AST[] | AST, opt?: Option): string;

  exprToSQL(ast: any, opt?: Option): string;

  whiteListCheck(
    sql: string,
    whiteList: string[],
    opt?: Option
  ): Error | undefined;

  tableList(sql: string, opt?: Option): string[];

  columnList(sql: string, opt?: Option): string[];
}
