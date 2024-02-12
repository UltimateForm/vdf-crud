import { processFruit } from "./util/data";
export * from "./util/data";
export * from "./util/types";

console.log("START");
console.log(processFruit({ name: "Apple", flavor: "sweet" }));
console.log("END");
