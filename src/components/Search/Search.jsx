import styles from "./Search.module.scss"

function Search({search , searchHandler, setSearch}) {
    return (
        <input type="search" onKeyUp={searchHandler} placeholder='جستجو ...' value={search} onChange={(e) => setSearch(e.target.value)} className={styles.search}/>
    )
}

export default Search