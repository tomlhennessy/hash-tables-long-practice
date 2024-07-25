function kth (str, k) {
    const frequency = {};

    for (let char of str) {
        frequency[char] = (frequency[char] || 0) + 1;
    }

    const sortedChars = Object.keys(frequency).sort((a, b) => frequency[b] -frequency[a]);

    return sortedChars[k - 1];
}


function newAlphabet(str, newOrder) {
    const orderMap = {};

    for (let i = 0; i < str.length - 1; i++) {
        orderMap[newOrder[i]] = i;
    }

    for (let i = 0; i < str.length - 1; i++) {
        if (orderMap[str[i]] > orderMap[str[i + 1]]) {
            return false;
        }
    }

    return true;
}

function coinChange(coins, amount) {
    const dp = new Array(amount + 1).fill(Infinity);
    dp[0] = 0;

    for (let coin of coins) {
        for (let i = coin; i <= amount; i++) {
            dp[i] = Math.min(dp[i], dp[i - coin] + 1);
        }
    }

    return dp[amount] === Infinity ? -1 : dp[amount];
}
