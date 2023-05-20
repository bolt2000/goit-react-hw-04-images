import { useState } from 'react';
import { ToastContainer } from 'react-toastify';
import FormSearch from './SearchBar/SearchBar';
import ImageGallery from './ImageGallery/ImageGallery';
import css from './App.module.css';


export function App() {
  
  // const [showModal, useShowModal] = useState(false);
  // const [largeImage, setLargeImage] = useState(''); 
  const [searchText, setSearchText] = useState('');
  const [page, setPage] = useState(1);
  

  const nextPage = () => {
    setPage(( page + 1 ));
  };

  const handleSearch = searchText => {
    setSearchText( searchText);
  };

    return (
      <div className={css.App}>
        <FormSearch onSubmit={handleSearch} />

        <ImageGallery
          searchText={searchText}
          nextPage={nextPage}
          page={page}
        />

        <ToastContainer autoClose={2500} />
      </div>
    );
  }


export default App;


// export class App extends Component {
//   state = {
//     showModal: false,
//     largeImage: null,
//     searchText: '',
//     page: 1,
//   };

//   nextPage = () => {
//     this.setState(prevState => ({ page: prevState.page + 1 }));
//   };

//   handleSearch = searchText => {
//     this.setState({ searchText, page: 1 });
//   };

//   render() {
//     return (
//       <div className={css.App}>
//         <FormSearch onSubmit={this.handleSearch} />

//         <ImageGallery
//           searchText={this.state.searchText}
//           nextPage={this.nextPage}
//           page={this.state.page}
//         />

//         <ToastContainer autoClose={2500} />
//       </div>
//     );
//   }
// }

// export default App;
