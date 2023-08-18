export function customSort(a, b) {
  // Split the headings into separate parts
  const aParts = a.sub_heading.split(".");
  const bParts = b.sub_heading.split(".");

  // Compare each part of the headings
  for (let i = 0; i < Math.max(aParts.length, bParts.length); i++) {
    // Convert parts to integers (or use localeCompare for string comparison)
    const aValue = parseInt(aParts[i]) || 0;
    const bValue = parseInt(bParts[i]) || 0;

    // Compare the parts
    if (aValue < bValue) {
      return -1; // a should come before b
    } else if (aValue > bValue) {
      return 1; // b should come before a
    }
  }

  // If the headings are identical up to this point,
  // the shorter heading should come first
  return aParts.length - bParts.length;
}
const strToincrementedStr = (subH) => {
  const subHeadingParts = subH.split(".");
  const lastPart = parseInt(subHeadingParts[subHeadingParts.length - 1]);
  const incrementedSubHeading = subHeadingParts
    .slice(0, subHeadingParts.length - 1)
    .concat(lastPart + 1)
    .join(".");
  return incrementedSubHeading;
};
const newObj = (subH) => ({
  heading: "Heading",
  sub_heading: subH,
  htmlContent: "<p>Content</p>",
  img: "",
});
export const addAdjacentHeading = async (headings, subheading) => {
  let arr = [...headings];
  console.log(arr, "fullarr");
  console.log(subheading, "subheading");

  let subH = subheading;

  var filterArr = [];
  var leftArr = [];
  arr.forEach((v) => {
    if (
      (
       subH.length>1?v.sub_heading.startsWith(subH.slice(0, subH.length - 1)):subH
      )
       &&
      parseInt(subH.slice(-1)) <= parseInt(v.sub_heading.slice(-1)) &&
        v.sub_heading.length === subH.length
    ) {
      filterArr.push(v);
    } else {
      leftArr.push(v);
    }
  });
  // Increment the sub-heading value of subsequent objects
  console.log(filterArr, "filterArr");
  console.log(leftArr, "leftArr");
  let increasingArr = [];
  filterArr.forEach((v, i) => {
    let obj = { ...v };
    obj.sub_heading = strToincrementedStr(obj.sub_heading);
    increasingArr.push({ ...obj });
  });
  increasingArr.push({ ...newObj(subheading) });
  // .map((v)=>({...v}))
  let mergedArr = [...increasingArr, ...leftArr];
  mergedArr.sort(customSort);
  // console.log(sortedArr);
  return mergedArr;
};

export const addChildHeading = async (headings, subheading) => {
  let arr = [...headings];

  var filterArr = [];
  var leftArr = [];
  arr.forEach((v) => {
    if (
      v.sub_heading.startsWith(subheading + ".") &&
      v.sub_heading.length === subheading.length + 2
    ) {
      filterArr.push(v);
    } else {
      leftArr.push(v);
    }
  });
  console.log(filterArr);
  if (filterArr.length > 0) {
    let sortedArr = filterArr.sort(customSort);
    let subH = sortedArr.slice(-1)[0].sub_heading;

    let incSubH = strToincrementedStr(subH);

    arr.push({ ...newObj(incSubH) });

    arr.sort(customSort);
    // setHeadings([...arr]);
    return arr;
  } else {
    let obj = newObj(subheading + ".1");
    arr.push({ ...obj });
    arr.sort(customSort);
    // setHeadings([...arr]);
    return arr;
  }
};
