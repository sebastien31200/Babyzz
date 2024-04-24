export const TileColor = ["#B0C5A4",
    "#D37676",
    "#51829B",
    "#EBC49F",
    "#628f30",
    "#CACF5E",
    "#AD88C6",
    "#F6995C",
    "#EADFB4"]

export function getQuestionColor(questionId: number){
    let colorCode = questionId <= TileColor.length - 1 ? TileColor[questionId] : TileColor[questionId - TileColor.length];
    return colorCode;
}