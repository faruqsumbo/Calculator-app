import { create, all, number } from "mathjs";

const config = {
    number: "BigNumber",
    precision: 19
}

export const math = create(all, config)