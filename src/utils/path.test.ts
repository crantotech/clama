import * as os from "node:os";
import * as path from "node:path";
import { describe, it } from "mocha";
import "should";
import { arePathsEqual, getReadablePath } from "./path";

suite("Path Utilities", () => {
  suite("arePathsEqual", () => {
    test("should handle undefined paths", () => {
      arePathsEqual(undefined, undefined).should.be.true();
      arePathsEqual("foo", undefined).should.be.false();
      arePathsEqual(undefined, "foo").should.be.false();
    });

    test("should handle case sensitivity based on platform", () => {
      if (process.platform === "win32") {
        arePathsEqual("FOO/BAR", "foo/bar").should.be.true();
      } else {
        arePathsEqual("FOO/BAR", "foo/bar").should.be.false();
      }
    });

    test("should handle normalized paths", () => {
      arePathsEqual("/tmp/./dir", "/tmp/../tmp/dir").should.be.true();
      arePathsEqual("/tmp/./dir", "/tmp/../dir").should.be.false();
    });
  });

  suite("getReadablePath", () => {
    test("should handle desktop path", () => {
      const desktop = path.join(os.homedir(), "Desktop");
      const testPath = path.join(desktop, "test.txt");
      getReadablePath(desktop, "test.txt").should.equal(testPath.replace(/\\/g, "/"));
    });

    //TODO Revisit the Windows related tests
    test("should show relative paths within cwd", () => {
      const cwd = process.platform === "win32" ? "c:/home/user/project" : "/home/user/project";
      const filePath = process.platform === "win32" ? "c:/home/user/project/src/file.txt" : "/home/user/project/src/file.txt";

      getReadablePath(cwd, filePath).should.equal(
        process.platform === "win32" ? "c:/home/user/project/src/file.txt" : "src/file.txt",
      );
    });

    test("should show basename when path equals cwd", () => {
      const cwd = process.platform === "win32" ? "c:/home/user/project" : "/home/user/project";
      getReadablePath(cwd, cwd).should.equal("project");
    });

    test("should show absolute path when outside cwd", () => {
      const cwd = process.platform === "win32" ? "c:/home/user/project" : "/home/user/project";
      const filePath = process.platform === "win32" ? "c:/home/user/other/file.txt" : "/home/user/other/file.txt";
      getReadablePath(cwd, filePath).should.equal(filePath);
    });
  });
});
