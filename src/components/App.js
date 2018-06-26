import React, { Component } from 'react';
import axios from 'axios';

import './App.css';

import Header from './Header/Header';
import Compose from './Compose/Compose';
import Post from './Post/Post';

class App extends Component {
  constructor() {
    super();

    this.state = {
      posts: []
    };

    this.updatePost = this.updatePost.bind( this );
    this.deletePost = this.deletePost.bind( this );
    this.createPost = this.createPost.bind( this );
  }
  
  async componentDidMount() {
    let result = await axios.get('https://practiceapi.devmountain.com/api/posts');
    this.setState({posts: result.data});
  }

  async updatePost(id, text) {
    let result = await axios.put(`https://practiceapi.devmountain.com/api/posts?id=${id}`, {text});
    this.setState({posts: result.data});
  }

  async deletePost(id) {
    let result = await axios.delete(`https://practiceapi.devmountain.com/api/posts?id=${id}`);
    this.setState({posts: result.data});
  }

  async createPost(text) {
    let result = await axios.post('https://practiceapi.devmountain.com/api/posts', {text});
    this.setState({posts: result.data});
  }

  render() {
    const { posts } = this.state;
    let list = posts.map((e, i) => {
      return <Post 
                key={i} 
                text={e.text}
                date={e.date}
                updatePostFn={this.updatePost}
                deletePostFn={this.deletePost}
                id={e.id}/>
    });

    return (
      <div className="App__parent">
        <Header />

        <section className="App__content">

          <Compose 
            createPostFn={this.createPost}/>
          {list}
        </section>
      </div>
    );
  }
}

export default App;
