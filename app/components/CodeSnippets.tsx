import CodeBlock, { cm, dc, fn, kw, num, op, str, ty } from "./CodeBlock";

export function SnippetWatermelonModel() {
  return (
    <CodeBlock filename="models/Inspection.ts">
      {cm("// Each decorated field maps directly to a column in local SQLite")}
      {"\n"}
      {kw("import")} {op("{{")} {ty("Model")} {op("}}")} {kw("from")} {str("'@nozbe/watermelondb'")}{"\n"}
      {kw("import")} {op("{{")} {dc("field")}{op(", ")}{dc("date")} {op("}}")} {kw("from")} {str("'@nozbe/watermelondb/decorators'")}{"\n"}
      {"\n"}
      {kw("export class")} {ty("Inspection")} {kw("extends")} {ty("Model")} {op("{{")}
      {"\n"}
      {"  "}{kw("static")} {dc("table")} {op("= ")}{str("'inspections'")}{"\n"}
      {"\n"}
      {"  "}{dc("@field")}{op("(")}{str("'job_id'")}{op(")")}{"\n"}
      {"  "}{dc("jobId")}{op("!: ")}{ty("string")}{"\n"}
      {"\n"}
      {"  "}{dc("@field")}{op("(")}{str("'status'")}{op(")")}{"\n"}
      {"  "}{dc("status")}{op("!: ")}{ty("string")}{"\n"}
      {"\n"}
      {"  "}{dc("@date")}{op("(")}{str("'synced_at'")}{op(")")}{"\n"}
      {"  "}{dc("syncedAt")}{op("!: ")}{ty("Date")} {op("| ")}{kw("null")}{"\n"}
      {op("}}")}
    </CodeBlock>
  );
}

export function SnippetWatermelonSync() {
  return (
    <CodeBlock filename="sync/watermelonSync.ts">
      {cm("// The push/pull contract your backend must satisfy exactly")}{"\n"}
      {kw("await")} {fn("synchronize")}{op("({")}
      {"\n"}
      {"  "}{dc("database")}{op(",")}{"\n"}
      {"\n"}
      {"  "}{fn("pullChanges")}{": async ("}{op("{")}{" "}{dc("lastPulledAt")}{" "}{op("}")}{") => {"}{"\n"}
      {"    "}{kw("const")} {op("{{")} {dc("data")} {op("}}")} {op("= ")}{kw("await")} {dc("api")}{op(".")}{fn("post")}{op("(")}{str("'/sync/pull'")}{op(", {{ ")}{dc("lastPulledAt")}{op(" }}")}{op(")")}{"\n"}
      {"    "}{kw("return")} {dc("data")}{op(".")}{dc("changes")}{"  "}{cm("// { created, updated, deleted } per table")}{"\n"}
      {"  "}{op("},")}{"\n"}
      {"\n"}
      {"  "}{fn("pushChanges")}{": async ("}{op("{")}{" "}{dc("changes")}{op(", ")}{dc("lastPulledAt")}{" "}{op("}")}{") => {"}{"\n"}
      {"    "}{kw("await")} {dc("api")}{op(".")}{fn("post")}{op("(")}{str("'/sync/push'")}{op(", {{ ")}{dc("changes")}{op(", ")}{dc("lastPulledAt")}{op(" }}")}{op(")")}{"\n"}
      {"  "}{op("},")}{"\n"}
      {"\n"}
      {"  "}{dc("migrationsEnabledAtVersion")}{op(": ")}{num("1")}{op(",")}{"\n"}
      {op("})")}{"\n"}
      {cm("// Conflicts, retries, and partial failures are your code's responsibility")}
    </CodeBlock>
  );
}

export function SnippetPowerSyncSchema() {
  return (
    <CodeBlock filename="powersync/schema.ts">
      {cm("// Declare what the local SQLite database should contain")}{"\n"}
      {kw("import")} {op("{{")} {fn("column")}{op(", ")}{ty("ColumnType")}{op(", ")}{ty("Schema")}{op(", ")}{ty("Table")} {op("}}")} {kw("from")} {str("'@powersync/react-native'")}{"\n"}
      {"\n"}
      {kw("export const")} {dc("AppSchema")} {op("= ")}{kw("new")} {ty("Schema")}{op("([")}
      {"\n"}
      {"  "}{kw("new")} {ty("Table")}{op("({")}
      {"\n"}
      {"    "}{dc("name")}{op(": ")}{str("'inspections'")}{op(",")}{"\n"}
      {"    "}{dc("columns")}{op(": [")}
      {"\n"}
      {"      "}{fn("column")}{op("(")}{str("'job_id'")}{op(", ")}{ty("ColumnType")}{op(".")}{dc("TEXT")}{op("),")}{"\n"}
      {"      "}{fn("column")}{op("(")}{str("'status'")}{op(", ")}{ty("ColumnType")}{op(".")}{dc("TEXT")}{op("),")}{"\n"}
      {"      "}{fn("column")}{op("(")}{str("'updated_at'")}{op(", ")}{ty("ColumnType")}{op(".")}{dc("INTEGER")}{op("),")}{"\n"}
      {"    "}{op("],")}{"\n"}
      {"  "}{op("}),")}{"\n"}
      {op("])")}
    </CodeBlock>
  );
}

export function SnippetPhotoSchema() {
  return (
    <CodeBlock filename="db/schema.sql">
      {cm("-- Metadata lives in SQLite; the binary file stays on the filesystem")}{"\n"}
      {kw("CREATE TABLE")} {ty("inspection_photo")} {op("(")}{"\n"}
      {"  "}{dc("id")}{"              "}{ty("TEXT")}{"    "}{kw("PRIMARY KEY")}{op(",")}{"\n"}
      {"  "}{dc("inspection_id")}{"   "}{ty("TEXT")}{"    "}{kw("NOT NULL")}{op(",")}{"\n"}
      {"  "}{dc("local_path")}{"      "}{ty("TEXT")}{op(",")}{"     "}{cm("-- absolute path on device")}{"\n"}
      {"  "}{dc("remote_url")}{"      "}{ty("TEXT")}{op(",")}{"     "}{cm("-- populated after upload confirms")}{"\n"}
      {"  "}{dc("sync_status")}{"     "}{ty("TEXT")}{"    "}{kw("DEFAULT")} {str("'pending'")}{"  "}{cm("-- pending | uploaded | failed")}{"\n"}
      {op(")")}
    </CodeBlock>
  );
}

export function SnippetUploadQueue() {
  return (
    <CodeBlock filename="storage/uploadQueue.ts">
      {kw("async function")} {fn("flushPendingPhotos")}{op("(")}{dc("db")}{op(": ")}{ty("SQLiteDatabase")}{op(") {")}
      {"\n"}
      {"  "}{kw("const")} {dc("rows")} {op("= ")}{kw("await")} {dc("db")}{op(".")}{fn("getAllAsync")}{op("<")}{ty("Photo")}{op(">(")}{"\n"}
      {"    "}{str("`SELECT * FROM inspection_photo WHERE sync_status = 'pending'`")}{"\n"}
      {"  "}{op(")")}{"\n"}
      {"\n"}
      {"  "}{kw("for")} {op("(")}{kw("const")} {dc("photo")} {kw("of")} {dc("rows")}{op(") {")}
      {"\n"}
      {"    "}{kw("const")} {dc("url")} {op("= ")}{kw("await")} {fn("uploadToStorage")}{op("(")}{dc("photo")}{op(".")}{dc("local_path")}{op(")")}{"\n"}
      {"\n"}
      {"    "}{cm("// Only mark uploaded after the server confirms success")}{"\n"}
      {"    "}{kw("await")} {dc("db")}{op(".")}{fn("runAsync")}{op("(")}{"\n"}
      {"      "}{str("`UPDATE inspection_photo")}{"\n"}
      {"         "}{str("SET remote_url = ?, sync_status = 'uploaded'")}{"\n"}
      {"       "}{str("WHERE id = ?`")}{op(",")}{"\n"}
      {"      "}{op("[")}{dc("url")}{op(", ")}{dc("photo")}{op(".")}{dc("id")}{op("]")}{"\n"}
      {"    "}{op(")")}{"\n"}
      {"  "}{op("}")}{"\n"}
      {op("}")}
    </CodeBlock>
  );
}
