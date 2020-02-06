$(document).ready(() => {
    $.get(`/api/rank`, function (data) {
        $('#progress').hide()
        for(i in data) {
            j = i
            i = data[i]

            //append
            $('#rank').append(`
            <tr>
                <td>${parseInt(j) + 1}</td>
                <td>${i.email}</td>
                <td>${i.score}</td>
            </tr>
            `)
        }
    })
})