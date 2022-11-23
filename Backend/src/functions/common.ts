import * as fs from "fs";
import path from "path";

export const getEntities = (entityType: string) => {
  // Reading the database using Sync Method
  const filePath: string = path.join("src", "database", entityType + ".json");
  return JSON.parse(fs.readFileSync(filePath, "utf8"));
};

export const saveEntity = (entityType: string, jsonContent: string) => {
  const filePath: string = path.join("src", "database", entityType + ".json");
  fs.writeFile(filePath, jsonContent, "utf8", (err: any) => {
    if (err) {
      console.log("An error occured while writing to the JSON File!!");
      return console.log(err);
    }
    console.log("The JSON File has been updated!!");
  });
};
