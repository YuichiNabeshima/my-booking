import { BaseBatch } from './BaseBatch';
import { DIContainer } from './di_container/DIContainer';

const args = process.argv.slice(2);
const fileName = args.shift();
const params = args;

if (!fileName) {
  console.error('\x1b[31mPlease specify the batch file name\x1b[0m');
  process.exit(1);
}

const fileNameArray = fileName.split('/');
const className = fileNameArray.length === 0 ? fileName : fileNameArray[fileNameArray.length - 1];

runBatch(fileName, params);

export async function runBatch(fileName: string, params: string[]) {
  const diContainer = new DIContainer();
  try {
    const batchModule = await import(`./${fileName}.ts`);

    if (!batchModule[className]) {
      throw new Error(`Class "${className}" not found in module "${fileName}".`);
    }

    const BatchClass = batchModule[className];
    const batchInstance = diContainer.resolve<BaseBatch>(BatchClass);
    batchInstance.params = params;

    console.log(`\x1b[34m[Batch Started] ${className}\x1b[0m`);
    const startTime = Date.now();

    await batchInstance.run();

    const endTime = Date.now();
    console.log(
      `\x1b[34m[Batch Completed] ${className} in ${(endTime - startTime) / 1000}s\x1b[0m`,
    );
  } catch (error) {
    console.error('\x1b[31mBatch execution failed\x1b[0m', error);
  }
}
