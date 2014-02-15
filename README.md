TweetMyBitcoins
===============

I am a twitter bot able to answer human questions about bicoin public addresses and information.

- Question

    - We identify it is a question with a question word: (What|How much)
    - Then the object of the question: (price|value|balance|transaction)
    - Then the REFERENCE/TIME/UNIT

    Example questions:

    : Value of bitcoin

      - (What|How much)                                 -> Question word 

        NOW                                             -> Time
        (is) the (price|value) of bitcoins              -> Object

        PAST
        (was|has been) the (price|value) of bitcoins
        (yesterday|last week|last month)        

        FUTURE
        (will be) the (price|value) of bitcoins

        (at) (btce|bitstamp|btcchina)                   -> Reference

        (in) (dollars|euros|yuans|guiness pints)        -> Unit

    ; Balance of an address
    
      - (QUESTION WORD)
      - is the (balance)
      - of (xxxxxx)     
      - in (UNIT)

    ; Bitcoins sent/received 

            SENT               RECEIVED                
    
      -              (QUESTION WORD)
      - (sent)               (received)
      - by, from             
      - (public address)     (public address)

      Example: How much has received (public address)
               How much has send (public address)
               What has been received by (public address)

               Tell me total the Bitcoins sent from (public address)

    ; Transaction value
    
      - (QUESTION WORDS)
      - bitcoins
      - have been
      - (transferred)
      - with (transaction hash)

      Example: How much has been (transferred) with (hash)
