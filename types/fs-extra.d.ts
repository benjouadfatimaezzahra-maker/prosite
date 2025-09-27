import type { Dirent, ReadStream, WriteStream } from "fs";

interface ReaddirOptions {
  withFileTypes: true;
}

interface CopyOptions {
  overwrite?: boolean;
}

declare module "fs-extra" {
  const fsExtra: {
    pathExists(path: string): Promise<boolean>;
    ensureDir(path: string): Promise<void>;
    remove(path: string): Promise<void>;
    copy(src: string, dest: string, options?: CopyOptions): Promise<void>;
    readdir(path: string, options: ReaddirOptions): Promise<Dirent[]>;
    readFile(path: string, encoding: BufferEncoding): Promise<string>;
    writeFile(path: string, data: string, encoding: BufferEncoding): Promise<void>;
    createReadStream(path: string): ReadStream;
    createWriteStream(path: string): WriteStream;
  };

  export = fsExtra;
}
