/**
 * code
 */
class bowlingGame
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

function getid()
{
    var i = document.getElementById('frame1');
    var pins = 10;
    i.innerText = Math.floor(Math.random() * pins + 1);
    var score;
    if (i)
    {
        pins -= i;
    }
}



    var nodeRoll1 = document.querySelector('#tbl').querySelectorAll('#shot1');
    var nodeRoll2 = document.querySelector('#tbl').querySelectorAll('#shot2');
    var nodeTotal = document.querySelector('#tbl').querySelectorAll('.total');
    
    // for(i=0,j=0,k=0;i<nodeRoll1.length && j<nodeRoll2.length;i++,j++,k++)
    // {
    //     var pins = 10;
        
        
    //     nodeRoll1[i].innerText = Math.floor(Math.random() * pins + 1);
    //     // console.log("roll1: "+nodeRoll1[i].innerText);
    //     var remainder = 10 - nodeRoll1[i].innerText;
    //     nodeRoll2[j].innerText = Math.floor(Math.random() * remainder + 1);
    //     if(nodeRoll1[i].innerText == 10)
    //     {
    //         nodeRoll2[j].innerText = 0;
    //         continue;
    //     }
        
    //     if(nodeRoll1[i-1] && nodeRoll1[i-1].innerText == 10)
    //     {
    //         console.log('strike on roll 1' +" ondex of i is: " +i);
    //         // nodeRoll1[i].innerText = 5000;
    //         nodeTotal[k-1].innerText = parseInt(nodeRoll1[i-1].innerText) + parseInt(nodeRoll1[i].innerText) + parseInt(nodeRoll2[j].innerText);
    //     }
    //     else if(nodeRoll1[i].innerText == 10 && nodeRoll1[i-1].innerText == 10)
    //     {
    //         // nodeTotal[k-1].innerText = parseInt(nodeRoll1[i].innerText) + parseInt(nodeRoll1[i-1].innerText);
    //         continue;
    //     }
        
    //     // console.log("roll2: "+nodeRoll2[j].innerText)
    //     nodeTotal[k].innerText = parseInt(nodeRoll1[i].innerText) + parseInt(nodeRoll2[j].innerText);
    //     // console.log("score: "+nodeTotal[k].innerText)
    // }
 
    for(i=0,j=0,k=0;i<nodeRoll1.length && j<nodeRoll2.length;i++,j++,k++)
    {
        var pins = 10;
        
        nodeRoll1[i].innerText = Math.floor(Math.random() * pins + 1);
        var remainder = 10 - nodeRoll1[i].innerText;
        nodeRoll2[j].innerText = Math.floor(Math.random() * remainder + 1);
        
        if(i<3)
        nodeRoll1[i].innerText = 10;


        if (nodeRoll1[i] && nodeRoll1[i].innerText == 10)
            nodeRoll2[j].innerText = 0;

        //one strike
        if (nodeRoll1[i - 1] && nodeRoll1[i - 1].innerText == 10)
        {
            nodeTotal[k - 1].innerText = parseInt(nodeRoll1[i - 1].innerText) + parseInt(nodeRoll1[i].innerText) + parseInt(nodeRoll2[j].innerText);
            nodeTotal[k].innerText = parseInt(nodeRoll1[i].innerText) + parseInt(nodeRoll2[j].innerText);
        }

        //two strikes
        if ((nodeRoll1[i - 2] && nodeRoll1[i - 2].innerText == 10) && (nodeRoll1[i - 1].innerText == 10))
        {
            nodeTotal[k - 2].innerText = parseInt(nodeRoll1[i - 2].innerText) + parseInt(nodeRoll1[i - 1].innerText) + parseInt(nodeRoll1[i].innerText);
        }
       
        //three stikes in a row
        if (nodeRoll1[i - 2] && nodeRoll1[i - 2].innerText == 10 && nodeRoll1[i - 1].innerText == 10 && nodeRoll1[i].innerText == 10)
        {
            nodeTotal[k - 2].innerText = 30;
        }

        nodeTotal[k].innerText = parseInt(nodeRoll1[i].innerText) + parseInt(nodeRoll2[j].innerText);
    }
//##################################################################################################

/**
 * Tests
 */
describe('Bowling', () => 
{
    let bowling = new Object();

    beforeEach(() => 
    {
        bowling = new bowlingGame();
    });

    let addThrows = (pins,throws) =>
    {
        for (let i = 0; i < throws; i++) 
        {
            bowling.addThrow(pins);
        }
    };

    it('should calculate the score of bowling all gutter', () => 
    {
        addThrows(0,20);
        expect(bowling.getScore()).toBe(0);
    });

    it('should calculate the score of bowling all 3s', () => 
    {
        addThrows(3,20);
        expect(bowling.getScore()).toBe(60);
    });

    it('should calculate the score of bowling a spare and all gutters', () => 
    {
        addThrows(5,2);
        addThrows(0,18);
        expect(bowling.getScore()).toBe(10);
    });

    it('should calculate the score of bowling a spare and all 3s', () => 
    {
        addThrows(5,2);
        addThrows(3,18);
        expect(bowling.getScore()).toBe(67);
    });

    it('should calculate the score of bowling a strike and all gutters', () => 
    {
        addThrows(10,1);
        addThrows(0,18);
        expect(bowling.getScore()).toBe(10);
    });

    it('should calculate the score of bowling a strike and all 3s', () => 
    {
        addThrows(10,1);
        addThrows(3,18);
        expect(bowling.getScore()).toBe(70);
    });

    it('should calculate the score of bowling all strikes', () => 
    {
        addThrows(10,12);
        expect(bowling.getScore()).toBe(300);
    });
});

