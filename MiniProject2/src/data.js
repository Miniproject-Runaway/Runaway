import componentsImg from './assets/google.png';
import propsImg from './assets/runningspot.png';
import jsxImg from './assets/storage.png';
import stateImg from './assets/record.jpg';

export const CORE_CONCEPTS = [
  {
    image: componentsImg,
    title: '간편 로그인 제공',
    description:
      '구글 계정만 있다면 간편하게 로그인하실 수 있어요.',
  },
  {
    image: jsxImg,
    title: '짐 맡기기 spot 제공',
    description:
      '위치 기반으로 짐을 맡길수 있는 spot을 추천드려요.',
  },
  {
    image: propsImg,
    title: '러닝 spot 제공',
    description:
      '위치 기반으로 러닝 spot을 추천드려요.',
  },
  {
    image: stateImg,
    title: '러닝 기록 제공',
    description:
      ' 오늘 러닝을 기록해보세요. pace는 중요하지 않아요.',
  },
];

export const EXAMPLES = {
  components: {
    title: 'Components',
    description:
      'Components are the building blocks of React applications. A component is a self-contained module (HTML + optional CSS + JS) that renders some output.',
    code: `
function Welcome() {
  return <h1>Hello, World!</h1>;
}`,
  },
  jsx: {
    title: 'JSX',
    description:
      'JSX is a syntax extension to JavaScript. It is similar to a template language, but it has full power of JavaScript (e.g., it may output dynamic content).',
    code: `
<div>
  <h1>Welcome {userName}</h1>
  <p>Time to learn React!</p>
</div>`,
  },
  props: {
    title: 'Props',
    description:
      'Components accept arbitrary inputs called props. They are like function arguments.',
    code: `
function Welcome(props) {
  return <h1>Hello, {props.name}</h1>;
}`,
  },
  state: {
    title: 'State',
    description:
      'State allows React components to change their output over time in response to user actions, network responses, and anything else.',
    code: `
function Counter() {
  const [isVisible, setIsVisible] = useState(false);

  function handleClick() {
    setIsVisible(true);
  }

  return (
    <div>
      <button onClick={handleClick}>Show Details</button>
      {isVisible && <p>Amazing details!</p>}
    </div>
  );
}`,
  },
};