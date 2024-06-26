package com.example.jpatest.entity;

import com.example.jpatest.constant.Role;
import com.example.jpatest.dto.BoardDto;
import com.example.jpatest.dto.MemberFormDto;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;

import javax.persistence.*;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "test_board")
public class Board {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String email;
    private String subject;
    private String contents;
    private String name;
    private Long viewcnt = 0L; // 초기값으로 0 설정
    private LocalDateTime regdate;

    @OneToMany(mappedBy = "board", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Comment> comments = new ArrayList<>(); // Board와 Comment 사이의 OneToMany 관계

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "member_id")
    private Member member;

    public static Board createBoard(BoardDto boardDto, Long memberId){
        Board board = new Board();

        board.setEmail(boardDto.getEmail());
        board.setSubject(boardDto.getSubject());
        board.setContents(boardDto.getContents());
        board.setName(boardDto.getName());
        board.setViewcnt(boardDto.getViewcnt());
        board.setRegdate(LocalDateTime.now());

        // 멤버 로드 및 설정
        Member member = new Member();
        member.setId(memberId);
        board.setMember(member);

        System.out.println("Created Board: " + board.toString());

        return board;
    }


}