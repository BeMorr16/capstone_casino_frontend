import "./HTPBlackjack.css";

export default function HTPBlackjack() {
  return (
    <div className="BJ-HTP-background">
      <div className="BJ-instructions-part1">
        <div className="BJ-HTP-innerContainer">
        <h1 className="BJ-Title">Blackjack:</h1>
        <p>
          Welcome to our thrilling <strong>Blackjack game!</strong> Here’s a
          comprehensive guide on how to play and aim for that <strong>21</strong>.
        </p>

        <h2 className="BJ-SubTitle">Objective</h2>
        <p>
          The goal of Blackjack is to beat the dealer by having a hand value as
          close to 21 as possible without going over.
        </p>

        <h2 className="BJ-SubTitle">Card Values</h2>
        <ul>
          <li><strong>Number cards (2-10):</strong> Worth their face value.</li>
          <li>
            <strong>Face cards (Jacks, Queens, Kings):</strong> Worth 10 points
            each.
          </li>
          <li>
            <strong>Aces:</strong> Can be worth either 1 point or 11 points,
            depending on which value benefits your hand the most.
          </li>
        </ul>

        <h2 className="BJ-SubTitle">Basic Gameplay</h2>
        <ol>
          <li><strong>Place Your Bet:</strong> Choose how much you want to wager for the round. Betting options include <strong>$5, $25, $50, $100, etc</strong>.</li>
          <li>
            <strong>Initial Deal:</strong> Both you and the dealer are dealt two cards. Your cards are both face up, while the dealer has one card face up and one card face down.
          </li>
          <li>
            <strong>Player&#39;s Turn:</strong> 
            <ul>
              <li><strong>Hit:</strong> Draw another card to try to get closer to 21. You can hit as many times as you want.</li>
              <li><strong>Stand:</strong> Keep your current hand and end your turn.</li>
              <li><strong>Double Down:</strong> Double your initial bet and receive only one more card.</li>
            </ul>
            </li>
            <li>
              <strong>Dealer&#39;s Turn:</strong>
              <p>The dealer reveals their face-down card and must hit until their hand totals at least 17 points.</p>
            </li>
          </ol>
          </div>
      </div>

      <div className="BJ-instructions-part2">
        <div className="BJ-HTP-innerContainer">

        <h2 className="BJ-SubTitle">Winning Conditions</h2>
        <ul>
          <li>If your hand value is closer to 21 than the dealer&#39;s without exceeding 21, you win.</li>
          <li>If the dealer busts (goes over 21), you win.</li>
          <li>If you bust, you lose your bet.</li>
          <li>If you and the dealer have the same hand value, it&#39;s a push, and your bet is returned.</li>
        </ul>

        <h2 className="BJ-SubTitle">Special Hands</h2>
        <ul>
          <li><strong>Blackjack:</strong> An Ace and any 10-point card in your initial deal. Blackjack pays 3:2.</li>
          <li><strong>Insurance:</strong> If the dealer&#39;s face-up card is an Ace, you can take insurance, a side bet that the dealer has Blackjack. Insurance pays 2:1 if the dealer has Blackjack.</li>
        </ul>

        <h2 className="BJ-SubTitle">Perfect Pair</h2>
<p>
  In Blackjack, a Perfect Pair is a special side bet that rewards you for getting matching pairs of cards. There are three types of pairs:
</p>
<ul>
  <li><strong>Perfect Match</strong>: Both cards have the same value and suit, earning the highest payout of <strong>25x</strong>.</li>
  <li><strong>Coloured Pair</strong>: The cards have the same value but different suits, where one card is a club or spade and the other is a heart or diamond, earning a payout of <strong>12x</strong>.</li>
  <li><strong>Mixed Pair</strong>: The cards have the same value but different suits, such as a heart and a diamond or a club and a spade, earning a payout of <strong>6x</strong>.</li>
</ul>
<p>
  Make sure to place your side bets strategically and aim for the best pairs to maximize your winnings. Good luck!
</p>
        <h2 className="BJ-SubTitle">Strategy</h2>
        <ul>
          <li><strong>Basic Strategy:</strong> Use a basic strategy chart to make the statistically best decisions based on your hand and the dealer&#39;s up card.</li>
          <li><strong>Card Counting:</strong> An advanced technique to track the ratio of high to low cards remaining in the deck. This can influence your betting and playing decisions, but be cautious as it’s not always permitted.</li>
        </ul>

          </div>
      </div>
    </div>
  );
}
