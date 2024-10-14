import dayjs from "dayjs";
import { COL_START, COL_END } from "../common/constants.js";

/**
 * This transformer will split entries that go over midnight into two separate entries.
 * One starting at the original time and ending at midnight, and one starting at midnight
 * and ending on the original date.
 * This function cannot deal with entries that span over more than two days and will create
 * a faulty output instead of an error.
 * (Check your input if this is a concern for you)
 *
 * @param {*} input
 */
export function transform(input) {
  let out = [];
  let temp = [...input];
  for (let i = 0; i < temp.length; i++) {
    let entry = temp[i];

    let start = dayjs(temp[i][COL_START]);
    let end = dayjs(temp[i][COL_END]);

    if (!start.isSame(end, "day")) {
      console.debug("Entry is starts and ends on different days. Will split");
      let e1 = [...entry];
      let e2 = [...entry];

      e1[COL_END] = start
        .hour(23)
        .minute(59)
        .second(59)
        .format("YYYY-MM-DD HH:mm");
      e2[COL_START] = end
        .hour(0)
        .minute(0)
        .second(0)
        .format("YYYY-MM-DD HH:mm");

      console.debug("New entries:");
      console.debug(e1);
      console.debug(e2);

      out.push(e1);
      out.push(e2);
    } else {
      out.push(entry);
    }
  }

  return out;
}
