import { ReadableStream } from "node:stream/web";

const MAX_SIZE = 1024 * 1024; // 1MB

export const POST = async (request: Request) => {
  const startTime = new Date();
  try {
    const readableStream = request.body as ReadableStream;

    let chunks = [];
    let size = 0;

    console.log("Receiving chunks...");
    for await (const chunk of readableStream) {
      if(size % MAX_SIZE === 0) {
        console.log('Finished 1 MB Chunk')
        chunks = [];
        size = 0;
      };
      chunks.push(chunk);
      size += chunk.length;
    }

    console.log("Done");

    return new Response("Upload complete", { status: 200 });
  } catch (error) {
    console.error("Error during upload:", error);
    return new Response("Upload failed", { status: 500 });
  } finally {
    const endTime = new Date();
    console.log(`Time elapsed ${(endTime.valueOf() - startTime.valueOf()) / 60000} minutes.`)
  }
};
