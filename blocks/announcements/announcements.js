export default function decorate(block) {
  const arr = block.children;
  const fadeComplete = () => { block.appendChild(arr[0]); };
  for (let i = 0; i < arr.length; i += 1) {
    arr[i].addEventListener('animationend', fadeComplete, false);
  }
}
