import { arrangeItem } from '../common/land'

const dikeIsEmpty = c => c.type === 'dike' && c.contents.length === 0

// If the player has a dike without an animal on it, this
// function should return the row and column of it
const emptyDikeIndex = player => {
  const row = player.dikes.findIndex(r => r.some(dikeIsEmpty))
  if (row === -1) return null
  const col = player.dikes[row].findIndex(dikeIsEmpty)
  return {
    row,
    col,
  }
}

const reduceTokenOntoPlayer = (player, token) => {
  const dikeSpot = emptyDikeIndex(player)
  if (dikeSpot) {
    const { row, col } = dikeSpot
    return {
      ...player,
      dikes: [
        ...player.dikes.slice(0, row),
        [
          ...player.dikes[row].slice(0, col),
          {
            ...player.dikes[row][col],
            contents: [...player.dikes[row][col].contents, token],
          },
          ...player.dikes[row].slice(col + 1),
        ],
        ...player.dikes.slice(row + 1),
      ],
    }
  }
  return {
    ...player,
    tokens: [token, ...player.tokens],
  }
}

const autoArrangePlayer = player => {
  // ensure we don't recreate an identical player
  if (player.tokens.length === 0) return player
  // take the tokens off of player.tokens, and turn it into just []
  const tokensToRedistribute = player.tokens
  const playerWithEmptyTokens = {
    ...player,
    tokens: [],
  }
  // use reduceTokenOntoPlayer and try to find a place for every token,
  // but it can just put it back into tokens if no easy spot is found.
  return tokensToRedistribute.reduce(
    reduceTokenOntoPlayer,
    playerWithEmptyTokens
  )
}

export const autoArrange = G => {
  // ensure we don't recreate an identical G
  if (Object.keys(G.players).every(p => G.players[p].tokens.length === 0))
    return G
  return {
    ...G,
    players: {
      '0': autoArrangePlayer(G.players['0']),
      '1': autoArrangePlayer(G.players['1']),
    },
  }
}

export default (G, ctx, args) => {
  // TODO: if in the middle of another action, don't allow?? because when this ends, then it doesn't go back to action.
  if (args === undefined) {
    // if nothing, toggle showing the option pane
    return {
      ...G,
      action: G.action === 'arrange' ? null : 'arrange',
    }
  }
  return arrangeItem({ G, ctx }, args)
}
