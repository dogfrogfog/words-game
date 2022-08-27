import PageTitle from 'components/PageTitle';

const GroupSelector = () => <div>select group</div>;
const Pagination = () => <div>select page</div>;
const Options = () => <div>select options</div>;
const Word = () => <div>this is a word</div>;
const NavBlock = () => (
  <div className='flex'>
    <GroupSelector />
    <Pagination />
    <Options />
  </div>
);
const WordsList = () => (
  <div>
    <Word />
    <Word />
    <Word />
    <Word />
  </div>
);

const Wordbook = () => (
  <div className='py-2 px-2 w-full'>
    <PageTitle>Wordbook</PageTitle>
    <NavBlock />
    <WordsList />
  </div>
);

export default Wordbook;
