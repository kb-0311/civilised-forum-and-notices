type Vote = {
    created_at: string
    id: number
    post_id: number
    upvote: boolean
    username: string
  }
  
  type Topic = {
    created_at: string
    id: number
    topic: string
  }
  
  type postComment = {
    id: number
    created_at: string
    post_id: number
    text: string
    username: string
  }
  
  type Posts = {
    body: string
    created_at: string
    id: number
    media: string
    topic_id: number
    title: string
    username: string
    voteList: Vote[]
    commentList: postComment[]
    topic: Topic[]
  }