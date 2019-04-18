
/**
 * code
 */


export class bowlingGame
{
    constructor()
    {
        this.throws = [];
    }

    addThrow(pins)
    {
        this.throws.push(pins);
    }

    getScore()
    {
        let score = 0;
        for(let frameIndex = 0, throwIndex = 0; frameIndex < 10; ++frameIndex)
        {
            score += this.throws[throwIndex];
            score += this.throws[throwIndex + 1];

            if(this.spare(throwIndex) || this.strike(throwIndex))
            {
                score += this.throws[throwIndex + 2];
            }

            if(this.strike(throwIndex))
            {
                throwIndex++;
            }
            else
            {
                throwIndex += 2
            }
        }
        return score;
    }

    spare(throwIndex)
    {
        return this.throws[throwIndex] + this.throws[throwIndex + 1] === 10;
    }

    strike(throwIndex)
    {
        return this.throws[throwIndex] === 10;
    }
    
}

