import { Component , OnInit} from '@angular/core';
import { TweetService } from '../services/tweet.service';
import { UserTweet } from '../models/user/UserTweet';
@Component({
  selector: 'app-mis-tweets',
  templateUrl: './mis-tweets.component.html',
  styleUrl: './mis-tweets.component.css'
})
export class MisTweetsComponent implements OnInit{
   myTweets: UserTweet[] = [];
  editedTweet: string = '';
  editingId: number | null = null;

  constructor(private tweetService: TweetService) {}

  ngOnInit(): void {
    this.loadTweets();
  }

  loadTweets(): void {
    this.tweetService.getMyTweets().subscribe({
      next: data => this.myTweets = data,
      error: err => console.error('Error al cargar tweets', err)
    });
  }

  startEditing(tweet: UserTweet): void {
    this.editingId = tweet.id;
    this.editedTweet = tweet.tweet;
  }

  cancelEdit(): void {
    this.editingId = null;
    this.editedTweet = '';
  }

  updateTweet(): void {
    if (this.editingId != null) {
      this.tweetService.updateTweet(this.editingId, this.editedTweet).subscribe({
        next: () => {
          this.loadTweets();
          this.cancelEdit();
        },
        error: err => console.error('Error al actualizar tweet', err)
      });
    }
  }

  deleteTweet(id: number): void {
    this.tweetService.deleteTweet(id).subscribe({
      next: () => this.loadTweets(),
      error: err => console.error('Error al eliminar tweet', err)
    });
  }
}
