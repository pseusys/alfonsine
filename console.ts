import { alfonsine, isInput } from "./code/api";


try {
    const input = JSON.parse(process.argv[2])
    if (isInput(input)) console.log(JSON.stringify(alfonsine(input), null, 2))
    else throw Error("Given object is not a valid input!")
} catch (e) {
    console.log("Wrong input type! Check your json structure with './schemas/input.schema.json'")
    console.log(`Maybe following error message can help:\n${e}`)
}
