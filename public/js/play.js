$(document).ready(() => {
    $("#progress").hide()
    GetQuestions()
    // $("#spinner").hide()
    $(document).on('click', '.single', function () {
        let text = this.text
        let id = this.getAttribute("item")
        // let text = this.text
        $('#table').empty()
        $('#table').append(`
        <a href="#" class="back"><span uk-icon="chevron-left"></span></a>
        <div class="questionbox">
            <h4>${this.text}</h4>
            <div class="uk-margin">
                <input class="uk-input" type="text" id="answer-box" placeholder="Answer" />
            </div>
            <button class="uk-button uk-button-secondary uk-width-1-1" onclick="PostQuestion('${id}')">SUBMIT</button>
            <div class="alert-box">

            </div>
        </div>`)
    });
    $(document).on('click', '.back', function() {
        GetQuestions()
    })
})
function GetQuestions() {
    $(".alert-box").removeClass('alert-correct')
    $(".alert-box").removeClass('alert-wrong')
    $(".alert-box").removeClass('alert-completed')

    $('#table').empty()
    $('#table').append(`
    <table class="uk-table uk-table-small uk-table-divider">
        <thead>
        <tr>
            <th class="uk-width-small">Questions</th>
            <th>Name</th>
            <th class="uk-width-small">Level</th>
        </tr>
        </thead>
        <tbody id="list">

        </tbody>
    </table>`)
    $.get(`/api/subject`, function (data) {
        $("#progress").show()
        //data : array
        for (i in data) {
            let questions = data[i]

            $('#list').append(`
            <tr>
                <td>${parseInt(i) + 1}</td>
                <td><a href="#" class="single" item="${questions._id}">${questions.title}</a></td>
                <td>${questions.level}</td>
            </tr>
            `)
        }
        $('#progress').hide()
    })
}
function PostQuestion(id) {
    $(".alert-box").removeClass('alert-correct')
    $(".alert-box").removeClass('alert-wrong')
    $(".alert-box").removeClass('alert-completed')

    // console.log("hello")
    
    let new_answer = $('#answer-box').val().toLowerCase()
    $('#answer-box').val("")

    // let posting = $.post()
    var posting = $.post(`/api/question/${id}`, { answer:new_answer });
    $('#progress').show()
    posting.done((data) => {
        console.log(data)
        $('#progress').hide()
        if(data.text == "correct"){
            $(".alert-box").addClass('alert-correct')
        }
        else if(data.text == "completed"){
            //send back completed
            console.log("completed")
            $(".alert-box").addClass('alert-completed')
        } else {
            $(".alert-box").addClass('alert-wrong')
        }

    })
}

