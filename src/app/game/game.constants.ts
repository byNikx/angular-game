enum GameState {
    Pristine,
    Dirty,
    Win,
    Lose,
    End
}

enum TileState {
    Pristine,
    Active,
    Deactive,
    Dirty
}

enum TileStyleClass {
    Active = 'active',
    Deactive = 'deactive'
}

export {
    GameState,
    TileState,
    TileStyleClass
};

