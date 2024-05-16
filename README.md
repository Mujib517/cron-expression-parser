# cron-parser

### Simple cron parser to parse cron expressions with step, range and wildcard characters.

### To run locally

``` yarn ```

``` yarn run dev '*/15 0 1,15 * 1-5 /usr/bin/find' ```

### Tests
``` yarn test ```


### Limitations
* Parses cron with exactly 5 fields
* Doesn't take into consideration week day with names
* Doesn't take into consideration month names
