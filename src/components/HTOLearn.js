
export default function learnHTO(imageRef, answer, correctAnswer, number, callCorrectAnswer, index) {

    // if (this.state.possibleAnswers[this.state.number] === this.state.answer.toString()) {
    //   return this.correctAnswer();
    // }
    setTimeout(() => {
        if (index > number.length - 1) index = 0
        answer = number.charAt(index)
        if (answer == correctAnswer) {
            callCorrectAnswer()
            return
        }
        if (imageRef.current.click) {
            imageRef.current.click()
            learnHTO(imageRef, answer, correctAnswer, number, callCorrectAnswer, index + 1)
        }
    }, 2000);
}


// let number = "718"
// let caIndex = 0
// let correctAnswer = number.charAt(caIndex)

// export default function learnHTO(imageRef, answer, callCorrectAnswer, index) {

//     // if (this.state.possibleAnswers[this.state.number] === this.state.answer.toString()) {
//     //   return this.correctAnswer();
//     // }
//     setTimeout(() => {
//         answer = number.charAt(index)

//         if (answer == correctAnswer) {
//             callCorrectAnswer()
//             caIndex += 1
//             if (caIndex < number.length) {
//                 correctAnswer = number.charAt(caIndex)
//                 setTimeout(() => {
//                     learnHTO(imageRef, answer, callCorrectAnswer, 0)
//                 }, 1000)
//             }
//             return
//         }
//         if (imageRef.current.click) {
//             imageRef.current.click()
//             learnHTO(imageRef, answer, callCorrectAnswer, index + 1)
//         }

//     }, 2000);


// }
