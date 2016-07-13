module.exports = function (app) {
  const Song = app.models.Song
  const SongList = app.models.SongList
  const SongListSong = app.models.SongListSong


  Song.destroyAll()
  SongList.destroyAll()
  SongListSong.destroyAll()

  SongList.create([
    {name: 'Còn Trong Kỷ Niệm', url: 'john@doe.com', songListType: 0},
    {name: 'Hư', url: 'john@doe.com', songListType: 1}
  ], (err, songLists) => {
    if (err) {
      throw err
    }
    console.log('Created song lists: ', songLists)
    console.log('---------------------------------------')
    Song.create([
      {name: 'Duyên Phận', url: 'john@doe.com'},
      {name: 'Người Quên Chốn Cũ', url: 'jane@doe.com'},
      {name: 'Bob', url: 'bob@projects.com'}
    ], (err, songs) => {
      if (err) {
        throw err
      }

      console.log('Created song: ', songs)

      SongListSong.create([
        {songId: songs[0].id, songListId: songLists[0].id, type: songLists[0].songListType},
        {songId: songs[1].id, songListId: songLists[0].id, type: songLists[0].songListType},
        {songId: songs[2].id, songListId: songLists[0].id, type: songLists[0].songListType},
        {songId: songs[0].id, songListId: songLists[1].id, type: songLists[1].songListType},
        {songId: songs[2].id, songListId: songLists[1].id, type: songLists[1].songListType}
      ], () => {
        Song.find({}, (err, songs) => {
          if (err) {
            throw err
          }
          console.log('---------------------------------------')
          songs[0].list({}, (err, list) => {
            if (err) {
              throw err
            }

            console.log(list)
          })
        })
      })
    })
  })
  // SongList.create([
  //   {name: 'Còn Trong Kỷ Niệm', url: 'john@doe.com', type: 0},
  //   {name: 'Hư', url: 'john@doe.com', type: 1}
  // ], (err, songLists) => {
  //   songLists[0].songs.create([
  //     {name: 'Bob', url: 'john@doe.com'},
  //     {name: 'Duyên Phận', url: 'john@doe.com'},
  //     {name: 'Người Quên Chốn Cũ', url: 'john@doe.com'}
  //   ], () => {
  //     songLists[0].songs({}, (err, lists) => {
  //       console.log(lists)
  //     })
  //   })
  //
  // })
}
