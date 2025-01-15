import { readFile } from "node:fs/promises";
import path from "node:path";
import { after, describe, it } from "mocha";
import "should";
import * as vscode from "vscode";

const packagePath = path.join(__dirname, "..", "..", "..", "package.json");

suite("Clama Extension", () => {
  vscode.window.showInformationMessage("All tests done!");

  test("should verify extension ID matches package.json", async () => {
    const packageJSON = JSON.parse(await readFile(packagePath, "utf8"));
    const id = `${packageJSON.publisher}.${packageJSON.name}`;
    const clineExtensionApi = vscode.extensions.getExtension(id);

    clineExtensionApi?.id.should.equal(id);
  });

  test("should successfully execute the plus button command", async () => {
    await new Promise((resolve) => setTimeout(resolve, 400));
    await vscode.commands.executeCommand("clama.plusButtonClicked");
  });
});
