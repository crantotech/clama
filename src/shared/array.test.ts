import { describe, it } from "mocha";
import "should";
import { findLast, findLastIndex } from "./array";

suite("Array Utilities", () => {
  suite("findLastIndex", () => {
    test("should find last matching element's index", () => {
      const array = [1, 2, 3, 2, 1];
      const index = findLastIndex(array, (x) => x === 2);
      index.should.equal(3); // last '2' is at index 3
    });

    test("should return -1 when no element matches", () => {
      const array = [1, 2, 3];
      const index = findLastIndex(array, (x) => x === 4);
      index.should.equal(-1);
    });

    test("should handle empty arrays", () => {
      const array: number[] = [];
      const index = findLastIndex(array, (x) => x === 1);
      index.should.equal(-1);
    });

    test("should work with different types", () => {
      const array = ["a", "b", "c", "b", "a"];
      const index = findLastIndex(array, (x) => x === "b");
      index.should.equal(3);
    });

    test("should provide correct index in predicate", () => {
      const array = [1, 2, 3];
      const indices: number[] = [];
      findLastIndex(array, (_, index) => {
        indices.push(index);
        return false;
      });
      indices.should.deepEqual([2, 1, 0]); // Should iterate in reverse
    });

    test("should provide array reference in predicate", () => {
      const array = [1, 2, 3];
      findLastIndex(array, (_, __, arr) => {
        arr.should.equal(array); // Should pass original array
        return false;
      });
    });
  });

  suite("findLast", () => {
    test("should find last matching element", () => {
      const array = [1, 2, 3, 2, 1];
      const element = findLast(array, (x) => x === 2);
      should(element).not.be.undefined();
      element!.should.equal(2);
    });

    test("should return undefined when no element matches", () => {
      const array = [1, 2, 3];
      const element = findLast(array, (x) => x === 4);
      should(element).be.undefined();
    });

    test("should handle empty arrays", () => {
      const array: number[] = [];
      const element = findLast(array, (x) => x === 1);
      should(element).be.undefined();
    });

    test("should work with object arrays", () => {
      const array = [
        { id: 1, value: "a" },
        { id: 2, value: "b" },
        { id: 3, value: "a" },
      ];
      const element = findLast(array, (x) => x.value === "a");
      should(element).not.be.undefined();
      element!.should.deepEqual({ id: 3, value: "a" });
    });

    test("should provide correct index in predicate", () => {
      const array = [1, 2, 3];
      const indices: number[] = [];
      findLast(array, (_, index) => {
        indices.push(index);
        return false;
      });
      indices.should.deepEqual([2, 1, 0]); // Should iterate in reverse
    });
  });
});
