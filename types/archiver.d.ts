import type { Transform } from "stream";

declare module "archiver" {
  type Format = "zip";

  interface ArchiverOptions {
    zlib?: {
      level?: number;
    };
  }

  interface Archiver extends Transform {
    directory(source: string, destination: string | false): Archiver;
    finalize(): Promise<void>;
  }

  function archiver(format: Format, options?: ArchiverOptions): Archiver;

  export = archiver;
}
